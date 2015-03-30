/*jslint nomen: true */
/*globals define: true */

define(['jquery.hammer',
        'leaflet',
        'underscore',
        'jquery.cookie',
        'countdown',
        'app/locations',
        'app/api'],
function($, L, _, jqc, countdown, locations, api) {
  $(function() {

    var app = {

      answered: {},
      counter: 0,
      locations: [],
      location: {},
      collector: '',
      url: '',

      init: function() {
        var hammertime = $("body").hammer();

        // Get the survey from the slug
        api.getSurveyFromSlug(app.setup);
      },

      setup: function(survey) {
        console.log("Using survey", survey);
        var compiled, html;

        if (!survey) {
          $('.not-found-error').show();
          return;
        }
        app.survey = survey;
        app.locations = locations.locations[survey.slug];
        app.url = '/api/surveys/' + survey.id + '/responses';

        // Do we need a timer?
        if (survey.slug === 'pspl-age-gender' || survey.slug === 'pspl-template') {
          app.userTimer = true;
        }

        // Set up the welcome screen
        compiled = _.template($('#welcome-template').html());
        html = compiled(survey);
        $('.welcome').html(html);

        // Set the collector name, if we already know it.
        if ($.cookie('collectorName')){
          $('.name').val($.cookie('collectorName'));
        }

        // Set up the locations
        compiled = _.template($('#options-template').html());
        html = compiled({locations: app.locations});
        $('.location').html(html);
        $('.location').on('change', function() {
          app.location = _.findWhere(app.locations, { name: this.value });
          app.setMapLocation();
        });

        // Show the survey name
        $('.survey-name').html(survey.name);

        // Set up the map
        app.mapping();
        app.location = app.locations[0];
        app.setMapLocation();

        $('.go').on('touch', app.login);

        $('.loading').hide();
        $('.welcome').show();
      },

      /**
       * Get the user's name and location
       */
      login: function(e) {
        e.preventDefault();
        clearInterval(app.timer);

        var $t = $(this);


        app.collector = $t.parent().find('.name').val();
        if (app.collector === '') {
          $t.parent().find('.name').addClass('missing');
          return;
        }
        $.cookie('collectorName', app.collector, { path: '/' });
        console.log("Set cookie", $.cookie('collectorName'));

        var name;
        name = $t.parent().find(":selected").val();
        app.location = _.where(app.locations, { name: name })[0];
        app.setMapLocation();
        $('.survey-location').html("at " + app.location.name);

        $('.welcome').hide();
        $('.form').show();
        $('.footer').show();

        api.getForm(app.form);
      },

      mapping: function() {
        if (!app.map) {
          app.map = L.map('map');
          L.tileLayer('//a.tiles.mapbox.com/v3/matth.map-yyr7jb6r/{z}/{x}/{y}.png', {
            maxZoom: 18
          }).addTo(app.map);
        }
      },

      setMapLocation: function() {
        if (app.layer) {
          app.map.removeLayer(app.layer);
        }

        app.map.setView([app.location.centroid[1], app.location.centroid[0]], 18);

        app.layer = L.geoJson({
          type: "Feature",
          geometry: app.location.geometry
        }, {
          style: {
            color: "#ffad00",
            opacity: 1,
            fillColor: "#ffad00"
          },
          pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
              radius: 15,
              color: "#ffad00",
              opacity: 1,
              fillColor: "#ffad00"
            });
          }
        }).addTo(app.map);
      },

      form: function(data) {
        var compiled, html;
        compiled = _.template($('#form-template').html());
        html = compiled(data);
        $('.form').html(html);

        // Set up the timer.
        if (app.userTimer) {
          // Get a date 10 minutes from now
          var targetDate = new Date();
          targetDate.setMinutes(targetDate.getMinutes() + 10);

          // Note the timer in the submit.
          app.timer = setInterval(function(){
            $('.clock').html("in " + countdown(targetDate).minutes + ":" + countdown(targetDate).seconds);
            if (countdown(targetDate).minutes === 0 && countdown(targetDate).seconds === 0) {
              $('body').addClass('timesup');
              $('.clock').html("&mdash; time's up");
              clearInterval(app.timer);
            }
          }, 1000);
        }

        // Listen for taps on the responses.
        $('.question').on('touch', app.add);
        $('.subtract').on('touch', app.subtract);
        $('.finished').on('touch', app.finished);
        $('.change-location').on('touch', app.changeLocation);
      },

      changeLocation: function(e) {
        if (e) {
          e.preventDefault();
        }
        $('.form').hide();
        $('.footer').hide();
        $('.welcome').show();
      },

      add: function(e) {
        e.preventDefault();
        var $t = $(this);
        var question = $t.attr('data-question');
        var action = $(e.target).attr('data-action');

        console.log("Action", action);
        if(action === 'subtract') { return; }

        if( _.has(app.answered, question)) {
          app.answered[question] += 1;
        } else {
          app.answered[question] = 1;
        }

        $t.addClass('tapped').delay(150).queue(function(next){
            $(this).removeClass("tapped");
            next();
        });

        app.update(question);
      },

      subtract: function(e) {
        e.preventDefault();
        var $t = $(this);
        var question = $t.attr('data-question');

        if( _.has(app.answered, question)) {
          app.answered[question] -= 1;
        } else {
          app.answered[question] = 0;
        }

        // Can't go below zero.
        if (app.answered[question] < 0) {
          app.answered[question] = 0;
        }

        $t.addClass('tapped').delay(150).queue(function(next){
            $(this).removeClass("tapped");
            next();
        });

        app.update(question);
      },

      update: function(question) {
        var count = app.answered[question];
        $(".count[data-question='" + question + "']").html(count);
        if (count === 0) {
          $(".count[data-question='" + question + "']").addClass('zero');
        } else {
          $(".count[data-question='" + question + "']").removeClass('zero');
        }
      },

      /**
       * Things that should happen when all the fields are complete
       */
      finished: function() {
        clearInterval(app.timer);
        app.submit();

        // reset the app after a brief delay
        // it it happens immediately, the user doesn't get enough feedback
        // don't wait for the data to submit to reset (speed!)
        window.setTimeout(app.reset, 100);
      },

      /**
       * Data has been submitted
       */
      done: function() {
        $('.connection-error').hide();
        console.log("Done");
      },

      /**
       * We were unable to submit data
       */
      fail: function(jqXHR, textStatus, error) {
        $('.connection-error').show();
        console.log("Post failed", jqXHR, textStatus, error);

        // Update the counter
        app.counter -= 1;
        app.update();
      },

      /**
       * Submit selected data
       */
      submit: function() {
        $('body').removeClass('timesup');

        // Make a clone in case the answers change before this submits.
        var answered = _.clone(app.answered);

        var notes = $('#notes').val();
        if(notes) {
          // console.log("Notes", answered, notes);
          answered.notes = notes;
        }

        // Prepare data in the format that LocalData wants
        var data = {
          responses: [
            {
              source: {
                collector: app.collector,
                type: 'bikeapp'
              },
              object_id: app.location.id,
              geo_info: {
                geometry: app.location.geometry,
                centroid: app.location.centroid,
                humanReadableName: app.location.name
              },
              responses: answered || {}
            }
          ]
        };

        console.log("saving data", data);
        console.log("saving to", app.url);
        // var j = $.post(app.url, data);
        var j = $.ajax({
          url: api.getSurveyURL() + '/responses',
          type: 'POST',
          data: JSON.stringify(data), // JSON.stringify({ responses: [response] }),
          headers: {
            pragma: 'no-cache'
          },
          contentType: 'application/json; charset=utf-8'
        });

        j.done(app.done);
        j.fail(app.fail);
      },

      /**
       * Have all the fields been submitted?
       * Returns true if all three fields are complete
       * @return {Boolean}
       */
      ready: function() {
        if (app.answered.direction && app.answered.sex && app.answered.travel) {
          return true;
        }
        return false;
      },

      /**
       * Reset the fields, visually indicate we're submitting the data.
       */
      reset: function() {

        // Reset the counts
        app.answered = {};

        // And mark them as zero.
        $('.count').html('0');
        $('.count').addClass('zero');

        // Update the counter
        app.counter += 1;
        app.update();

        $('body').addClass('success').delay(300).queue(function(next){
          $('body').removeClass("success");
          app.changeLocation();
          next();
        }.bind(this));
      }
    };

    app.init();
  });
});

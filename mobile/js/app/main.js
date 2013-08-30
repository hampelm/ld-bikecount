define(['jquery.hammer', 'underscore', 'jquery.cookie', 'app/locations', 'app/api'], function($, _, jqc, locations, api) {
  $(function() {

    var app = {

      answered: {},
      counter: 0,
      location: {},
      collector: '',
      url: '',

      init: function() {
        var hammertime = $("body").hammer();

        // Get the survey from the slug
        api.setSurveyIdFromSlug(app.setup);
      },

      setup: function(survey) {
        if (!survey) {
          // display an error
          $('.not-found-error').show();
          return;
        }
        app.survey = survey;
        app.url = '/api/surveys/' + app.survey + '/responses';

        // Set the collector name, if we already know it.
        if ($.cookie('collectorName') !== null){
          $('.name').val($.cookie('collectorName'));
        }

        // Set up the locations
        var compiled = _.template($('#options').html());
        var html = compiled(locations);
        $('.location').html(html);

        $('.go').on('touch', app.login);
        $('.in').on('touch', app.select);

        $('.loading').hide();
        $('.welcome').show();
      },

      /**
       * Get the user's name and location
       */
      login: function(e) {
        e.preventDefault();

        var $t = $(this);
        var name;

        name = $t.parent().find(":selected").val();
        app.location = _.where(locations.locations, { name: name })[0];
        app.collector = $t.parent().find('.name').val();
        $.cookie('collectorName', app.collector, { path: '/' });

        $('.welcome').hide();
        $('.form').show();
        $('.footer').show();
      },

      /**
       * Select an answer
       */
      select: function(e) {
        e.preventDefault();
        var $t = $(this);
        $t.closest('.question').find('.in').removeClass('selected');
        $t.toggleClass('selected');

        // Set the answer
        app.answered[$t.attr('data-question')] = $t.text();

        // If we've answered everything, submit the data.
        if(app.ready()) {
          app.finished();
        }
      },

      /**
       * Things that should happen when all the fields are complete
       */
      finished: function() {
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
        // Make a clone in case the answers change before this submits.
        var answered = _.clone(app.answered);

        // Prepare in the format that LocalData wants
        // Wow, this is ugly.
        var data = {
          responses: [
            {
              source: {
                collector: app.collector,
                type: 'bikeapp'
              },
              object_id: app.location.name,
              geo_info: {
                geometry: {
                  type: 'Point',
                  coordinates: app.location.location
                },
                centroid: app.location.location,
                humanReadableName: app.location.name
              },
              responses: answered
            }
          ]
        };

        console.log(data);
        console.log("saving to", app.url);
        var j = $.post(app.url, data);
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
        app.answered = {};
        $('.in').removeClass('selected');
        $('body').addClass('success').delay(300).queue(function(next){
            $(this).removeClass("success");
            next();
        });

        // Update the counter
        app.counter += 1;
        app.update();
      },

      /**
       * Update the counter
       */
      update: function() {
        var label = (app.counter === 1) ? 'response' : 'responses';
        $('.counter').html(app.counter + ' ' + label);
      }

    };

    app.init();
  });
});

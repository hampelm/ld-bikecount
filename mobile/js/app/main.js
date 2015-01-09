/*jslint nomen: true */
/*globals define: true */

define(['jquery.hammer', 'underscore', 'jquery.cookie', 'app/locations', 'app/api'], function($, _, jqc, locations, api) {
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

        // Set the collector name, if we already know it.
        if ($.cookie('collectorName') !== null){
          $('.name').val($.cookie('collectorName'));
        }

        // Set up the welcome screen
        compiled = _.template($('#welcome-template').html());
        html = compiled(survey);
        $('.welcome').html(html);

        // Set up the locations
        compiled = _.template($('#options-template').html());
        html = compiled({locations: app.locations});
        $('.location').html(html);

        // Show the survey name
        $('.survey-name').html(survey.name);

        $('.go').on('touch', app.login);

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
        app.location = _.where(app.locations, { name: name })[0];
        console.log("Using location", app.location);
        app.collector = $t.parent().find('.name').val();
        $.cookie('collectorName', app.collector, { path: '/' });
        $('.welcome').hide();
        $('.form').show();
        $('.footer').show();

        api.getForm(app.form);
      },

      form: function(data) {
        console.log("Setting up form", data);
        var compiled, html;
        compiled = _.template($('#form-template').html());
        html = compiled(data);
        $('.form').html(html);

        // Listen for taps on the responses.
        $('.question').on('touch', app.add);
        $('.subtract').on('touch', app.subtract);
        $('.finished').on('touch', app.finished);
        $('.change-location').on('touch', app.changeLocation);
      },

      changeLocation: function(e) {
        e.preventDefault();
        $('.form').hide();
        $('.footer').hide();
        $('.welcome').show();
      },

      add: function(e) {
        e.preventDefault();
        var $t = $(this);
        var question = $t.attr('data-question');

        if( _.has(app.answered, question)) {
          app.answered[question] += 1;
        } else {
          app.answered[question] = 1;
        }

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

        app.update(question);
      },

      update: function(question) {
        var count = app.answered[question];
        $(".count[data-question='" + question + "']").html(count);
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
              object_id: app.location.id,
              geo_info: {
                geometry: app.location.geometry,
                centroid: app.location.centroid,
                humanReadableName: app.location.name
              },
              responses: answered
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

        $('body').addClass('success').delay(300).queue(function(next){
            $(this).removeClass("success");
            next();
        });

        // And mark them as zero.
        $('.count').html('0');

        // Update the counter
        app.counter += 1;
        app.update();
      }
    };

    app.init();
  });
});

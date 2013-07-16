define(['jquery.hammer', 'underscore', 'app/locations'], function($, _, locations) {
  $(function() {

    var app = {

      answered: {},
      counter: 0,
      location: {},
      collector: '',
      url: 'https://localhost:3443/api/surveys/576410f0-eb46-11e2-a9c1-2b2cf307ced9/responses',

      init: function() {
        var hammertime = $("body").hammer();

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
              collector: app.collector,
              geo_info: {
                centroid: app.location.location,
                humanReadableName: app.location.name
              },
              responses: answered
            }
          ]
        };

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
        $('body').addClass('done').delay(500).removeClass('done');

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

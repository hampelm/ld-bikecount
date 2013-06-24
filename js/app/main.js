define(['jquery', 'jquery.hammer'], function($) {
  $(function() {

    var app = {

      answered: {},
      counter: 0,

      init: function() {
        var hammertime = $("body").hammer();

        $('.in').on('touch', app.select);
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
       *
       * Things that should happen when all the fields are complete
       */
      finished: function() {
        // reset the app after a brief delay
        // it it happens immediately, the user doesn't get enough feedback
        window.setTimeout(app.reset, 100);
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
        console.log("Done!");
        app.answered = {};
        $('.in').removeClass('selected');
        $('body').addClass('done').delay(500).removeClass('done');

        // Update the counter
        app.counter += 1;
        var label = (app.counter === 1) ? 'response' : 'responses';
        $('.counter').html(app.counter + ' ' + label);
      }

    };

    app.init();
  });
});

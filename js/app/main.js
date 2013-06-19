define(['jquery', 'jquery.touch'], function($) {
  $(function() {

    var app = {

      answered: {},
      counter: 0,

      init: function() {
        $('.in').click(app.select);
      },

      /**
       * Select an answer
       */
      select: function(e) {
        e.preventDefault();
        var $t = $(e.target);
        $t.closest('.question').find('.in').removeClass('selected');
        $t.toggleClass('selected');

        // Set the answer
        app.answered[$t.attr('data-question')] = $t.text();

        // If we've answered everything, submit the data.
        if(app.ready()) {
          app.finished();
        }
      },

      finished: function() {
        window.setTimeout(app.reset, 100);
      },

      /**
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
       * Resets the fields, visually indicates we're submitting the data.
       */
      reset: function() {
        console.log("Done!");
        app.answered = {};
        app.counter += 1;
        $('.in').removeClass('selected');
        $('body').addClass('done').delay(500).removeClass('done');
      }

    };

    app.init();
  });
});

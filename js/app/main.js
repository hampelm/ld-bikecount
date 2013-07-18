define([
  'jquery.hammer',
  'underscore',
  'backbone',
  'app/settings',
  'app/models/responses',
  'app/locations'], function($, _, Backbone, settings, Responses, locations) {

  $(function() {

    var app = {
      fields: ['direction', 'sex', 'travel'],
      survey: '17c46670-ee39-11e2-9343-15e7a97eb5af',

      init: function() {
        settings.surveyId = app.survey;

        // Get all the responses
        app.results = new Responses.Collection([], {
          surveyId: app.survey
        });

        app.results.on('addSet', app.render);
      },

      render: function() {
        console.log("rendering", app.results);

        $('.count').html(app.results.length);

        _.each(app.fields, app.graph);
      },

      graph: function(field) {
        var responses = app.results.pluck('responses');
        var counts = _.countBy(responses, function(response) {
          return response[field];
        });

        var answers = app.clean(counts);
        console.log(answers);
        var template = _.template($('#t-graph').html());
        $('.' + field).html(template({
          answers: answers
        }));
      },

      clean: function(counts) {
        var keys = _.keys(counts);
        var neat = [];
        var total = 0;

        _.each(keys, function(key){
          total += counts[key];
        });

        _.each(keys, function(key){
          var clean = {
            name: key,
            count: counts[key],
            percent: counts[key] / total * 100
          };

          neat.push(clean);
        });

        return neat;
      }

    };

    app.init();
  });

});

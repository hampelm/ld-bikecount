define([
  'jquery.hammer',
  'underscore',
  'backbone',
  'app/api',
  'app/settings',
  'app/models/responses',
  'app/locations'], function($, _, Backbone, api, settings, Responses, locations) {

  $(function() {

    var app = {
      fields: ['direction', 'sex', 'travel'],
      survey: '',

      init: function() {
        api.setSurveyIdFromSlug(app.setup);
      },

      setup: function(survey, error) {
        if(error) {
          $('.intro').hide();
          $('.tools').hide();
          $('.error').show();
          return;
        }

        app.survey = survey;

        // Set up download/mobile links
        app.links();

        // Get all the responses
        app.results = new Responses.Collection([], {
          surveyId: app.survey
        });

        app.results.on('addSet', app.render);
      },

      links: function() {
        var slug = window.location.hash.slice(1);
        $('.mobile').attr('href', 'mobile/#' + slug);

        var download = '/api/surveys/' + app.survey + '/responses.csv';
        $('.download').attr('href', download);
      },

      render: function() {
        console.log("rendering", app.results);

        $('.count').html(app.results.length);

        _.each(app.fields, app.graph);
        app.bin();
      },

      bin: function() {
        var dates = app.results.groupBy(function(model) {
          var created = new Date(model.get('created'));
          return created.toDateString();
        });
        console.log(dates);
        var template = _.template($('#t-filter').html());
        $('.filter select').append(template({
          dates: dates
        }));
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

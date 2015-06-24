define([
  'jquery.hammer',
  'underscore',
  'backbone',
  'leaflet/leaflet',
  'app/api',
  'app/settings',
  'app/models/responses',
  'app/locations'], function($, _, Backbone, L, api, settings, Responses, locations) {

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
        app.results.on('reset', app.render);

        // Create the map
        var map = L.map('map', {
          maxZoom: 19
        }).setView([51.505, -0.09], 13);
        app.map = map;

        // add an OpenStreetMap tile layer
        L.tileLayer('http://a.tiles.mapbox.com/v3/matth.map-yyr7jb6r/{z}/{x}/{y}.png', {
          maxZoom: 19
        }).addTo(map);

        console.log("Created map", map);
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
        app.binDates();
        app.mapLocations();
      },

      // Bin responses by date
      binDates: function() {
        var dates = app.results.groupBy(function(model) {
          var created = new Date(model.get('created'));
          return created.toDateString();
        });
        var template = _.template($('#t-filter').html());
        $('.filter').html(template({
          dates: dates
        }));

        // Handle filtering by date
        $('.filter select').change(function(event){
          var value = $(event.target).val();
          var date =  new Date(value);
          app.results.dateFilter(date);

          $('.reset').show();
          $('.reset').click(this.reset);
        }.bind(this));
      },

      reset: function() {
        app.results.clearFilter();
      },

      mapLocations: function(response) {
        var resultLocations = app.results.groupBy(function(model){
          return model.get('geo_info').humanReadableName;
        });

        if (app.group) {
          app.group.clearLayers();
        }

        var group = new L.featureGroup().addTo(app.map);
        app.group = group;
        _.each(resultLocations, function(list, location) {
          var latlng = _.where(locations.locations, { name: location})[0].location;
          latlng = _.clone(latlng).reverse();
          var options = {
            'color': '#f15a24',
            'fillColor': '#f15a24',
            'radius': list.length
          };
          var marker = new L.CircleMarker(latlng, options);
          group.addLayer(marker);
        });
        app.map.fitBounds(group.getBounds());

      },

      graph: function(field) {
        var responses = app.results.pluck('responses');
        var counts = _.countBy(responses, function(response) {
          return response[field];
        });

        var answers = app.clean(counts);
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

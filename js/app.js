requirejs.config({
    'baseUrl': 'js/lib',
    'paths': {
      'app': '../app',
      'backbone': 'backbone',
      'moment': 'moment',
      'jquery': '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min',
      'underscore': 'lodash'
    },
    'shim': {
      backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      },

      'jquery.hammer': {
        deps: ['jquery'],
        exports: '$'
      },

      'leaflet/leaflet': {
        exports: 'L'
      }
    }
});

// Load the main app module to start the app
requirejs(['app/main']);

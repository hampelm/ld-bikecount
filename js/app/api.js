/*jslint nomen: true */
/*globals define: true */

define(function (require) {
  'use strict';

  var settings = require('app/settings');
  var _ = require('underscore');
  var $ = require('jquery');

  var api = {};

  // Return the current hostname.
  // TODO: Should be in util
  api.getBaseURL = function() {
    if (window.location.protocol != "https:") {
      return "https://" + window.location.host;
    }

    return "http://" + window.location.host;
  };

  // Find a survey by slug
  // Given a slug (eg 'just-a-surey') Sets settings.surveyId
  api.setSurveyIdFromSlug = function(callback) {
    var slug = window.location.hash.slice(1);
    var url = settings.api.baseurl +  "/slugs/" + slug;
    console.log("Survey slug: " + url);

    // Save ourselves an ajax request
    if (settings.slug === slug && settings.surveyId !== null) {
      return callback();
    }

    // TODO: Display a nice error if the survey wans't found.
    $.getJSON(url, function(data) {
      console.log("Survey Id: " + data.survey);
      settings.slug = slug;
      settings.surveyId = data.survey;
      callback(data.survey);
    });
  };


  // Generates the URL for the current survey
  // (Current survey is set by setSurveyIdFromSlug, above)
  api.getSurveyURL = function() {
    return settings.api.baseurl + "/surveys/" + settings.surveyId;
  };

  // Get a chunk of responses.
  // If startIndex or count are not provided, get all of the responses.
  // callback(error, responses)
  // Options as follows
  // options: {
  //  startIndex: int,
  //  count: int,
  //  sort: ('asc'|'desc') -- sort by date. defaults to 'asc'
  // }
  api.getResponses = function (options, callback) {
    var url;
    if (options.sort === undefined) {
      options.sort = 'desc';
    }
    if (options.startIndex === undefined || options.count === undefined) {
      url = api.getSurveyURL() + '/responses';
    } else {
      url = api.getSurveyURL() + '/responses?startIndex=' + options.startIndex + '&count=' + options.count + '&sort=' + options.sort;
    }

    $.getJSON(url, function (data) {
      if (_.isArray(data.responses)) {
        callback(null, data.responses);
      } else {
        callback({
          type: 'APIError',
          message: 'Received an invalid response from the API'
        });
      }
    });
  };


  // Add a 100% buffer to a bounds object.
  // Makes parcels render faster when the map is moved
  var addBuffer = function(bounds) {
    var sw = bounds.getSouthWest();
    var ne = bounds.getNorthEast();

    var lngDiff = ne.lng - sw.lng;
    var latDiff = ne.lat - sw.lat;

    var lngMod = lngDiff / 2;
    var latMod = latDiff / 2;

    var newSW = new L.LatLng(sw.lat - latMod, sw.lng - lngMod);
    var newNE = new L.LatLng(ne.lat + latMod, ne.lng + lngMod);

    return new L.LatLngBounds(newSW, newNE);
  };

  // Get all the objects in the map bounds from the GeoAPI
  // Take a map bounds object
  // Find the parcels in the bounds
  // Feed those objects to the callback
  api.getObjectsInBounds = function(bounds, callback) {
    var bufferedBounds = addBuffer(bounds);
    var southwest = bufferedBounds.getSouthWest();
    var northeast = bufferedBounds.getNorthEast();

    // Given the bounds, generate a URL to ge the responses from the API.
    var url = api.getGeoBoundsObjectsURL(southwest, northeast);
    console.log(url);

    // Give the callback the responses.
    $.getJSON(url, function(data){
      if(data) {
        callback(data);
      }
    });
  };

  return api;
});

module.exports.register = function (Handlebars, options) {
  'use strict';

    var Dates = require('../utils/dates');

    Handlebars.registerHelper('replaceStr', function (haystack, needle, replacement) {
        if (haystack && needle) {
          return haystack.replace(needle, replacement).replace('index.html', '');
        } else {
          return '';
        }
    });

    // group in 3s
    Handlebars.registerHelper('block', function(index) {
        var block = Math.floor(index / 3);
        return block;
    });

    /**
       * {{canonical}}
       * Builds a canonical url, stripping out dist dir and index.html
       * @param  {String} dirname file firectory location
       * @param  {String} basename filename
       * @param  {String} ext file extension
       * @return {String} formattedUrl Canonical url
       */
    Handlebars.registerHelper('canonical', function(dirname, basename, ext) {
        var base = 'http://blog.grahamlicence.co.uk/',
            url = dirname + '/' + basename + ext,
            path = url.replace('dist/', '').replace('index.html', ''),
            formattedUrl = base + path;

        return formattedUrl;
    });

    /**
       * {{formatDate}}
       * Port of formatDate-js library (http://bit.ly/18eo2xw)
       * Docs http://ruby-doc.org/core-2.2.3/Time.html#strftime-method
       * @param  {[type]} date   [description]
       * @param  {[type]} format [description]
       * @return {[type]}        [description]
       */
    Handlebars.registerHelper('formatDate', function(date, format) {
        date = new Date(date);
        return Dates.format(date, format);
    });

};
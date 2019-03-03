'use strict';

var visit = require('unist-util-visit');

var schemes = require('./schemes.js');

function plugin() {
  return transformer;

  function transformer(tree) {
    visit(tree, 'link', function (link) {
      if (link.url) {
        if (link.url[0] === '/') {
          // Local link
          return;
        }

        if (schemes.some(function (scheme) {
          return link.url.startsWith(scheme + ':');
        })) {
          // Valide scheme
          return;
        }

        link.url = '/' + link.url;
      }
    });
  }
}

module.exports = plugin;
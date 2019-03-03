'use strict';

const visit = require('unist-util-visit');
const schemes = require('./schemes.js');

function plugin() {
  return transformer;
  function transformer(tree) {
    visit(tree, 'link', link => {
      if (link.url) {
        if (link.url[0] === '/') { // Local link
          return;
        }

        if (schemes.some(scheme => link.url.startsWith(scheme + ':'))) {
          // Valide scheme
          return;
        }

        link.url = '/' + link.url;
      }
    });
  }
}

module.exports = plugin;


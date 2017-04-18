var postcss = require('postcss');

module.exports = function(css, opts) {
  return postcss([]).process(css, opts);
}

var _ = require("lodash");

module.exports = function(_node) {
  _.extend(this, _node.properties);

  if (this.id) {
    this.id = this.id;
  }
  if (this.name) {
    this.name = this.name;
  }
};

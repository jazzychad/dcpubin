var mongoose = require("mongoose");

var shortid = require("shortid");

shortid.seed(20234123);

var create_shortid = function(schema, options) {
  schema.pre('save', function(next) {
	       this.shortid = shortid.generate();
	       next();
	     });
};


module.exports.create_shortid = create_shortid;
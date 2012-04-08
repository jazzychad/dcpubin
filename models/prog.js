var mongoose = require("mongoose");
var plugins = require("./plugins");

var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var ProgSchema = new Schema({
			      shortid: {type: String, index: true, uniqe: true},
			      priv: {type: Boolean, default: false},
			      prog: {type: String, default: ""},
			      hex: {type: String, default: ""},
			      lang: {type: String, default: "asm"},
			      hash: {type: String, index: true, default: ""},
			      tstamp: {type: Date, default: function(){return new Date();}}
			    });

ProgSchema.plugin(plugins.create_shortid);

var Prog = mongoose.model('Prog', ProgSchema);

module.exports.Prog = Prog;
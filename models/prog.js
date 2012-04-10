var mongoose = require("mongoose");
var plugins = require("./plugins");

var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var ProgSchema = new Schema({
			      shortid: {type: String, index: true, uniqe: true},
			      views: {type: Number, default: 0},
			      auth: {type: String, default: ""}, /* author */
			      title: {type: String, default: ""},
			      priv: {type: Boolean, default: false},
			      prog: {type: String, default: ""},
			      hex: {type: String, default: ""},
			      lang: {type: String, default: "asm"},
			      hash: {type: String, index: true, default: ""},
			      ip: {type: String, default: ""},
			      tstamp: {type: Date, default: function(){return new Date();}}
			    });

ProgSchema.plugin(plugins.create_shortid);

var Prog = mongoose.model('Prog', ProgSchema);

module.exports.Prog = Prog;
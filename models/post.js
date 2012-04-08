var mongoose = require("mongoose");
var plugins = require("./plugins");

var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var PostSchema = new Schema({
			      shortid: {type: String, index: true, uniqe: true},
			      title: String,
			      body: String,
			      author: String
			    });

PostSchema.plugin(plugins.create_shortid);

var Post = mongoose.model('Post', PostSchema);

module.exports.Post = Post;
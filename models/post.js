var mongoose = require("mongoose");

var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var PostSchema = new Schema({
			      title: String,
			      body: String,
			      author: String
			    });

var Post = mongoose.model('Post', PostSchema);

module.exports.Post = Post;
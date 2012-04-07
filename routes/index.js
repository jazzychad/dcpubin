
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.new_post = function(req, res) {
  var Post = require("../models/post").Post;
  var post = new Post();
  post.title = req.body.title;
  post.body = req.body.body;
  post.author = req.body.author;
  post.save(function (err, new_post) {
	      if (err) {
		console.log(err);
	      }
	      res.end(post.toString());
	      /*
	      if (new_post) {
		res.end(new_post.toString());
	      } else {
		res.end('ok..');
	      }
	       */
	    });
};

exports.post_index = function(req, res) {
  var Post = require("../models/post").Post;
  Post.find({}, function(err, docs) {
	      res.render('post_index', {title: "posts index", posts: docs});
	    });
};

var Prog = require("../models/prog").Prog;

/*
 * GET home page.
 */

exports.index = function(req, res) {
  var shortid;
  if (req.params.id) {
    shortid = req.params.id;
  } else {
    shortid = "esRCW6cRn";
  }
  if (shortid) {
    Prog.findOne({shortid: shortid}, function(err, doc) {
		   if (err) {
		     res.end('program not found');
		   }
		   if (doc) {
		     res.render('home.ejs', {layout: false,  prog: doc, title: 'Express' });  
		   } else {
		     var prog = {prog: "", hex: "", shortid: null};
		     res.render('home.ejs', {layout: false,  prog: prog, title: 'Express' });  
		     //res.end('no prog');
		   }
		   
		 });
  } else {
    //var prog = new Prog();
    var prog = {prog: "", hex: ""};
    res.render('home.ejs', {layout: false,  prog: prog, title: 'Express' });  
  }
  
};

exports.create_new = function(req, res) {
  var prog = new Prog();
  prog.prog = req.body.prog;
  prog.hex = req.body.hex;
  prog.save(function (err, new_prog) {
	      if (err) {
		console.log(err);
		res.end('there was an error'); // TODO fix
	      }
	      if (new_prog) {
		var shortid = new_prog.shortid;
		res.redirect("/" + shortid);
	      } else {
		res.end('there was an error...'); // TODO fix
	      }
	    });
};

exports.new_none = function(req, res) {
  res.end('disallowed');
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

exports.post_show = function(req, res) {
  var Post = require("../models/post").Post;
  Post.findOne({shortid: req.params.id}, function(err, doc) {
		  if (err) {
		    res.end('post not found');
		  }
		  res.render('post_show', {title: "post show", post: doc});
		});
};
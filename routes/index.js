var md5 = require("MD5");

var Prog = require("../models/prog").Prog;


/*
 * GET home page.
 */

exports.index = function(req, res) {
  var shortid;
  var show_copy;
  if (req.params.id) {
    shortid = req.params.id;
    show_copy = true;
  } else {
    shortid = "esRCW6cRn";
    show_copy = false;
  }
  if (shortid) {
    Prog.findOne({shortid: shortid}, function(err, doc) {
		   if (err) {
		     res.end('program not found');
		   }
		   if (doc) {
		     res.render('home.ejs', {layout: false,  prog: doc, show_copy: show_copy});  
		   } else {
		     var prog = {prog: "", hex: "", shortid: null};
		     res.render('home.ejs', {layout: false,  prog: prog, show_copy: false});  
		   }
		   
		 });
  } else {
    res.end('error');
  }
  
};

exports.create_new = function(req, res) {
  var prog = new Prog();
  prog.prog = req.body.prog;
  prog.hex = req.body.hex;
  var hash = md5(prog.prog + prog.hex);
  prog.hash = hash;
  console.log("hash: " + hash);
  Prog.findOne({hash: hash}, function(err, doc) {
		 if (err) {
		   res.end('error, error');
		   return;
		 }
		 if (doc) {
		   res.redirect("/" + doc.shortid);
		   return;
		 }

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
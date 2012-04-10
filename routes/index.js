var md5 = require("MD5");

var Prog = require("../models/prog").Prog;

function getClientIp(req) {
  
  var ipAddress;
  // Amazon EC2 / Heroku workaround to get real client IP
  var forwardedIpsStr = req.header('x-forwarded-for'); 
  if (forwardedIpsStr) {
    
    // 'x-forwarded-for' header may return multiple IP addresses in
    // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
    // the first one
    var forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[0];
  }
  if (!ipAddress) {
    // Ensure getting client IP address still works in
    // development environment
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
};

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
		     if (show_copy) {
		       /*
		       doc.views +=1;
		       doc.save(function(e,d){});
			*/
		     } else {
		       doc.views = 0;
		     }
		     res.render('dcpu.ejs', {layout: true,  prog: doc, show_copy: show_copy, isnew: false});
		   } else {
		     var prog = {prog: "", hex: "", shortid: null};
		     res.render('dcpu.ejs', {layout: true,  prog: prog, show_copy: false, isnew: false});
		   }
		   
		 });
  } else {
    res.end('error');
  }
  
};

exports.fork_prog = function(req, res) {
  var shortid = req.params.id;
  Prog.findOne({shortid: shortid}, function(err, doc) {
		 if (err) {
		   res.end('program not found');
		 }
		 if (doc) {
		   doc.title = "";
		   doc.auth = "";
		   res.render('dcpu.ejs', {layout: true,  prog: doc, show_copy: false, isnew: true, fork: true});
		 } else {
		   res.redirect("/");
		 }
		 
	       });

};

exports.prog_human_view = function(req, res) {
  var shortid = req.params.id;
  Prog.findOne({shortid: shortid}, function(err, doc) {
		 if (err) {
		   res.end('');
		 }
		 if (doc) {
		   doc.views +=1;
		   doc.save(function(e,d){});
		   res.end('');
		 } else {
		   res.end('');
		 }
	       });
};

exports.create_new = function(req, res) {
  var prog = new Prog();
  prog.prog = req.body.prog;
  prog.hex = req.body.hex;
  prog.auth = req.body.auth;
  prog.title = req.body.title;
  if (typeof req.body.fork !== 'undefined' && req.body.fork) {
    prog.fork = req.body.fork;
  }
  prog.ip = getClientIp(req);
  var hash = md5(prog.prog + prog.hex + prog.auth + prog.title);
  prog.hash = hash;
  console.log("hash: " + hash);
  console.log("ip: " + prog.ip);

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

exports.new_prog = function(req, res) {
  var prog = {prog: "", hex: ""};
  res.render('dcpu.ejs', {layout: true, isnew: true, prog: prog, show_copy: false});
};

exports.progs_newest = function(req, res) {
  Prog.find({}).desc('tstamp').exec(function(err, docs) {
				      res.render('progs_newest.ejs', {progs: docs});
				      //res.end(docs.toString());
			   });
  
};

exports.progs_most_viewed = function(req, res) {
  Prog.find({}).desc('views').exec(function(err, docs) {
				     res.render('progs_top.ejs', {progs: docs});
				     //res.end(docs.toString());
			   });
  
};
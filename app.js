
/**
 * Module dependencies.
 */

var express = require('express')
, routes = require('./routes')
, mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/dcpubin_test');
mongoose.connect(process.env.MONGOLAB_URI);

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.new_prog);
app.get('/new', routes.new_prog);

app.get('/newest', routes.progs_newest);
app.get('/top', routes.progs_most_viewed);

app.get('/fork/:id', routes.fork_prog);
app.get('/view/:id', routes.prog_human_view);

app.get('/:id', routes.index);
app.post('/new', routes.create_new);


var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

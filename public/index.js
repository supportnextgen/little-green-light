/*-----------------------------------
  index.js is a simple server app
  running in Express using Twig as
  a templating language to serve up
  front-end builds without a CMS
-----------------------------------*/

var Twig = require("twig");
var express = require('express');
var app = express();

/*-----------------------------------
  Settings + Configs
-----------------------------------*/
// disable caching because this is just for local builds
Twig.cache(false);
// set where to find static assets
app.use(express.static('public'))
// set were to fine our template files
app.set('views', './templates');
// setup twig as our template parser
app.set("twig options", {
  strict_variables: false
});

/*-----------------------------------
  Routing
-----------------------------------*/
app.get('/', function(req, res) {
  res.render('index.twig');
});

app.get('/:seg1', function(req, res) {
  res.render(`${req.params.seg1}.twig`);
});

app.get('/:seg1/:seg2', function(req, res) {
  res.render(`${req.params.seg1}/${req.params.seg2}.twig`);
});

// ...if you need more complex routing you are on your own.

/*-----------------------------------
  Listeners
-----------------------------------*/
app.listen(5000);

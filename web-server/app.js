var express       = require('express'),
  methodOverride  = require('method-override'),
      session     = require('express-session'),
      bodyParser  = require('body-parser'),
      webRoutes   = require('./app/routes'),
      Token       = require('../shared/token');

var app = express();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

doConfigure = function () {
  app.use(methodOverride());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(app.router);
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/public');
  app.set('view options', {layout: false});
  app.set('basepath',__dirname + '/public');
};

if (app.get('env') == 'development') {
  app.use(express.static(__dirname + '/public'));
  app.use(webRoutes.frontend());
};

if (app.get('env') == 'production') {
  var oneYear = 31557600000;
  app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
  app.use(express.errorHandler());
}

doConfigure();

console.log("Web server has started.\nPlease log on http://127.0.0.1:3001/index.html");

app.listen(3001);

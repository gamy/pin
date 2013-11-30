
/**
 * Module dependencies.
 */

var express = require('express');


var http = require('http');
var path = require('path');
var auth = require('./dao/auth');
var app = express();
var router = require('./settings/url')


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.cookieParser());
app.use(express.cookieParser('gamy123'));
app.use(express.cookieSession({secret:'gamy1111'}));

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// app.use(auth.requireAuthentication);


// development only
if ('development' == app.get('env')) {
  console.log('setting for development env');
  app.use(express.errorHandler());
}


//router mapping is here.
router.map(app);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
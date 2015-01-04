var express = require('express'),
    app = express(),
    ejs = require('ejs');

var Verse = require('./classes/Verse').getVerse(),
    Planet = require('./classes/Planet'),
    Civilization = require('./classes/Civilization'),
    City = require('./classes/City');


var earth = new Planet('地球', 100, 30, 6371000, 24, 5507.85);
var human = new Civilization('人类', earth);
var beijing = new City('北京');
earth.addCity(beijing);
beijing.build('粮仓');

Verse.addCivilization(human);

// setInterval(function () {
//     Verse.nextTick(1);
// }, 1000);

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/civilization', function (req, res) {
    res.json(human);
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
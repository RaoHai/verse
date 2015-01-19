var pomelo = require('pomelo'),
    model = require('./app/models');

/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'verse');

// app configuration
app.configure('production|development', 'connector', function(){
  app.set('connectorConfig',
    {
      connector : pomelo.connectors.hybridconnector,
      heartbeat : 3,
      useDict : true,
      useProtobuf : true
    });
});

model.init().then(function (result) {
    console.log(" >>>>> model init result:", result);
    
    // start app
    app.start();
});


process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});

(function() {
    'use strict';

    var express = require('express'),
        app = express(),
        mongoose = require('mongoose'),
        bodyParser = require('body-parser'),
        morgan = require('morgan'),
        path = require('path'),
        config = require('./server.config'),
        cmsRoutes = require('./server/cms/cms_routes')(app, express);

    //---------Body Parser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    //---------Middleware for CORS requests

    app.use(function(req, res, next){
        res.setHeader('Access-Control-Allow-Origin','*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Headers','X-Requested-With, \
            Authorization');

        next();
    });

    //---------Set up Database Connection

    mongoose.connect(config.database);

    //---------------------------Set Up API Routing

    app.use('/api/cms', cmsRoutes);

    //LOG ALL REQUESTS TO CONSOLE
    app.use(morgan('dev'));
    app.use(express.static(__dirname + '/public'));


    //START THE SERVER
    app.listen(config.port);
    console.log('Server Active at port ' + config.port);
})();
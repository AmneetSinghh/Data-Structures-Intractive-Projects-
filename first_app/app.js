// header("Access-Control-Allow-Origin: *");
// Defining CORS
// This is the server side pencho;

const express = require('express');
const app = express();
app.use(function(req, res, next) {
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});
const socketio = require('socket.io');
const mongoose = require('mongoose');
//https://stackoverflow.com/questions/27599614/var-express-requireexpress-var-app-express-what-is-express-is-it#
// require means, it will load all the modules, relared to that keywords or frameworks of javascirpt, example express, socketio and mongoose.

const expresserver = app.listen(3001); // return http object
const io = socketio(expresserver); // we give our returned http onejct to socket.io server.

const Game = require('./models/game'); // schemes dataase.
const QuotableAPI = require('./models/quoteAPI'); // api calling
// connecting to database.
mongoose.connect('mongodb://localhost:27017/typeracerTurorial', { useNewUrlParser: true, useUnifiedTopology: true },
    () => { console.log('Successfully connected to databse.') });
// set up server


console.log("check\n");
io.on('connect', (socket) => {
    socket.emit('test', 'This is from the server');
});
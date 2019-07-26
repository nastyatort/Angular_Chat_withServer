const http = require('http');
const express = require("express");
app = module.exports.app = express();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

global.currentUserId;
global.currentUserName;
global.writeMessage = false;

//session
const session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

global.sess;

//crypto
global.bcrypt = require('bcrypt');
global.salt = bcrypt.genSaltSync(10);

// WebSocket-сервер на порту 8081
var WebSocketServer = new require('ws');
var clients = {};

var webSocketServer = new WebSocketServer.Server({port: 3000});
webSocketServer.on('connection', function(ws) {

  var id = Math.random();
  clients[id] = ws;
  console.log("новое соединение " + id);

  ws.on('message', function(message) {
    // console.log('получено сообщение ' + message);
    for(var key in clients) {
      app.post("/message/create", urlencodedParser, messageModule.createMessages);
      console.log('успешность = ' + writeMessage)
      if(writeMessage == true){
        clients[key].send(message);
      }
    }
  });

  ws.on('close', function() {
    console.log('соединение закрыто ' + id);
    delete clients[id];
  });

});
//

cors = require('cors');
app.use(cors());
app.use(bodyParser.json());


//mongo

// const MongoClient = require("mongodb").MongoClient;
// // создаем объект MongoClient и передаем ему строку подключения
// const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

// mongoClient.connect(function (err, client) {
//     if (err) return console.log(err);
//     dbClient = client;
//     app.locals.collection = client.db("usersdb").collection("users");
//     app.locals.collectionMessage = client.db("usersdb").collection("messages");
//     app.locals.collectionSmile = client.db("usersdb").collection("smile");
// });

// mySQL

const mysql = require("mysql2");
  
global.connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "message",
  password: "root"
});

connection.connect(function(err){
  if (err) {
    return console.error("Ошибка: " + err.message);
  }
  else{
    console.log("Подключение к серверу MySQL успешно установлено");
  }
});

let messageModule = require('./message-module/message.module');
let loginModule = require('./login-module/login.module');
let registrationModule = require('./registration-module/registration.module');
let smileModule = require('./smile-module/smile.module');

app.post("/login", urlencodedParser, loginModule.login);
app.post("/registration", urlencodedParser, registrationModule.registration);
app.post("/message/get", urlencodedParser, messageModule.getMessages);
app.post("/smile/get", urlencodedParser, smileModule.smile);

app.listen(8008);
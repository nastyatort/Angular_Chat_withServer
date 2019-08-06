const http = require('http');
const express = require("express");
app = module.exports.app = express();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const multer = require("multer");

global.currentUserId;
global.currentUserName;
global.writeMessage = false;

//crypto
global.bcrypt = require('bcrypt');
global.salt = bcrypt.genSaltSync(10);


cors = require('cors');
app.use(cors({credentials: true, origin: 'http://localhost:8080'}));
app.use(bodyParser.json());

app.use(express.static('uploads'));

let messageModule = require('./message-module/message.module');
let loginModule = require('./login-module/login.module');
let registrationModule = require('./registration-module/registration.module');
let smileModule = require('./smile-module/smile.module');
let fileModule = require('./file-module/file.module');

// WebSocket-сервер на порту 8081
var WebSocketServer = new require('ws');
var WebSocketServer = new require('ws');
var clients = {};

var webSocketServer = new WebSocketServer.Server({ port: 3000 });
webSocketServer.on('connection', function (ws) {

  var id = Math.random();
  clients[id] = ws;
  console.log("новое соединение " + id);

  ws.on('message', function (message) {
    for (var key in clients) {
      //if(writeMessage == true){
      clients[key].send(message);
      // }
    }
  });

  ws.on('close', function () {
    console.log('соединение закрыто ' + id);
    delete clients[id];
  });

});
//


//multer
const storageConfig = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, './uploads');
  },
  filename: (req, file, next) => {
    next(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {

  if (file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg") {
    cb(null, true);
  }
  else {
    cb(null, false);
  }
}

//session


const session = require('express-session');


app.use(session({
  secret: 'ssshhhhh',
  maxAge: 24 * 60 * 60 * 1000,
  resave: false, 
  saveUninitialized: true
}))

app.use(multer({ storage: storageConfig, ileFilter: fileFilter }).single('uploadFile'));

app.post("/login", urlencodedParser, loginModule.login);
app.post("/registration", urlencodedParser, registrationModule.registration);
app.post("/message/create", urlencodedParser, messageModule.createMessages);
app.post("/message/get", urlencodedParser, messageModule.getMessages);
app.post("/smile/get", urlencodedParser, smileModule.smile);
app.post("/upload", fileModule.setFile);



app.listen(8008);
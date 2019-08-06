const http = require('http');
const express = require("express");
app = module.exports.app = express();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const multer = require("multer");

global.currentUserId;
global.currentUserName;
global.writeMessage = false;

let cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000 
}))

//crypto
global.bcrypt = require('bcrypt');
global.salt = bcrypt.genSaltSync(10);


cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

app.use(express.static('uploads'));

// mySQL

// const mysql = require("mysql2");

// global.connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "message",
//   password: "root"
// });

// connection.connect(function (err) {
//   if (err) {
//     return console.error("Ошибка: " + err.message);
//   }
//   else {
//     console.log("Подключение к серверу MySQL успешно установлено");
//   }
// });

let messageModule = require('./message-module/message.module');
let loginModule = require('./login-module/login.module');
let registrationModule = require('./registration-module/registration.module');
let smileModule = require('./smile-module/smile.module');
let fileModule = require('./file-module/file.module');

// WebSocket-сервер на порту 8081
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


app.get('/', function (req, res, next) {
  // Update views
  req.session.views = (req.session.views || 0) + 1

  // Write response
  res.end(req.session.views + ' views')
})

app.use(multer({ storage: storageConfig, ileFilter: fileFilter }).single('uploadFile'));

app.post("/login", urlencodedParser, loginModule.login);
app.post("/registration", urlencodedParser, registrationModule.registration);
app.post("/message/create", urlencodedParser, messageModule.createMessages);
app.post("/message/get", urlencodedParser, messageModule.getMessages);
app.post("/smile/get", urlencodedParser, smileModule.smile);
app.post("/upload", fileModule.setFile);



app.listen(8008);
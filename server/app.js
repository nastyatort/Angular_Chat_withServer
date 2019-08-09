const http = require('http');
const express = require("express");
app = module.exports.app = express();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const multer = require("multer");

cors = require('cors');
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
app.use(bodyParser.json());
app.use(express.static('uploads'));

//session

const session = require('express-session');
app.use(session({
    secret: 'ssshhhhh',
    maxAge: 24 * 60 * 60 * 1000,
    resave: false,
    saveUninitialized: true
}))

let messageModule = require('./message-module/message.module');
let loginModule = require('./login-module/login.module');
let registrationModule = require('./registration-module/registration.module');
let smileModule = require('./smile-module/smile.module');
let fileModule = require('./file-module/file.module');
let settingModule = require('./setting-module/setting.module');
let wsModule = require('./ws-module/ws.module');

app.use(multer({ storage: fileModule.storage, fileFilter: fileModule.filter }).single('uploadFile'));

app.post("/login", loginModule.login);
app.post("/registration", registrationModule.registration);
app.get("/message", messageModule.getMessages);
app.get("/smile", smileModule.smile);
app.post("/upload", fileModule.setFile);
app.get("/setting", settingModule.getUsers);
app.put("/setting", settingModule.updateUsers);


app.listen(8008);
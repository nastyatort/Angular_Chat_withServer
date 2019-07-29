const http = require('http');
const express = require("express");
app = module.exports.app = express();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

//crypto
global.bcrypt = require('bcrypt');
global.salt = bcrypt.genSaltSync(10);

cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

global.currentUserId;
global.currentUserName;

//mysql
const mysql = require("mysql2");

global.connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "booklist",
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
//

let loginModule = require('./login-module/login.module');
let registrationModule = require('./registration-module/registration.module');
let phonesModule = require('./phones-module/phones.module');
let userModule = require('./user-module/user.module');

app.post("/login", urlencodedParser, loginModule.login);
app.post("/registration", urlencodedParser, registrationModule.registration);
app.post("/phones/add", urlencodedParser, phonesModule.phonesAdd);
app.post("/phones/get", urlencodedParser, phonesModule.phonesGet);
app.post("/phones/update", urlencodedParser, phonesModule.phonesUpdate);
app.delete("/phones/delete/:id", urlencodedParser, phonesModule.phonesDelete);
app.post("/user/get", urlencodedParser, userModule.getUser);
app.post("/user/update", urlencodedParser, userModule.updateUser);

app.listen(8008)

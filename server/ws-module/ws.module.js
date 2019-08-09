let sequel = require('../db-module/db.module')
let WebSocketServer = new require('ws');
let clients = {};

let webSocketServer = new WebSocketServer.Server({ port: 3000 });
webSocketServer.on('connection', function (ws) {

    let id = Math.random();
    clients[id] = ws;
    console.log("новое соединение " + id);
    //let writeMessage = false;


    ws.on('message', function (message) {
        let messageObj = JSON.parse(message);
        sequel.messages.create({
            text: messageObj.text,
            userId: messageObj.userId,
            img: messageObj.img

        }).then(() => {
            writeMessage = true
            response.send();
        }).catch(err =>
            writeMessage = false
        );

        for (let key in clients) {
            if(writeMessage = true){
            clients[key].send(message);
            }else{
                console.log("ERROR")
            }
        }
    });

    ws.on('close', function () {
        console.log('соединение закрыто ' + id);
        delete clients[id];
    });

});

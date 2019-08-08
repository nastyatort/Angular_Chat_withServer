import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';


@Injectable()
export class SocketService {
    socket = new WebSocket("ws://localhost:3000");

    getSocket(data: any) {
        this.socket.send(JSON.stringify(data));
    }

    setSocket() {

        this.socket.onmessage = function(event) {
            console.log(event.data)
            var incomingMessage = event.data;

            var messageElem = document.createElement('div');
             messageElem.appendChild(document.createTextNode(incomingMessage));
             document.getElementById('message__wrapper').appendChild(messageElem);
          };
    }
}
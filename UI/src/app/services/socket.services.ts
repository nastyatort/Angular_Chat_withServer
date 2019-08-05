import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';


@Injectable()
export class SocketService {
    //socket = io('http://localhost:3000');
    socket = new WebSocket("ws://localhost:3000");

    getSocket(data: any) {
        // console.log('connected: ', this.socket.connected);
        // this.socket.emit('message', { data });
        this.socket.send(JSON.stringify(data));
    }

    // setSocket() {    
    //     return Observable.create((observer: { next: (arg0: any) => void; }) => {
    //         this.socket.on('message1', (message:any) => {
    //           observer.next(message);
    //           console.log(message)
    //         });
    //       });
    //     }

    setSocket() {

        this.socket.onmessage = function(event) {
            console.log(event.data)
            var incomingMessage = event.data;

            var messageElem = document.createElement('div');
             messageElem.appendChild(document.createTextNode(incomingMessage));
             document.getElementById('message__wrapper').appendChild(messageElem);
          };

        // this.socket.on('message1', function (message: any) {
        //     console.log('Message ' + message);


        //     var messageElem = document.createElement('div');
        //     messageElem.appendChild(document.createTextNode(message));
        //     document.getElementById('message__wrapper').appendChild(messageElem);

        // })
    }

    // console.log('set socket connected: ', this.socket.connected);
    // this.socket.on('message1', function (message: any) {
    //     console.log('Message ' + message);
    // })

}
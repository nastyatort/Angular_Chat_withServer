import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { UserService } from '../services/user.service';
import { SmileService } from '../services/smile.service';
import { MessageComponent } from '../message-page/message.component';
import { UserComponent } from '../user-page/user.component';
import { PassThrough } from 'stream';
// import {SmileComponent} from '../smile-page/smile.component';
//import { SocketService } from '../services/socket.services'

@Component({
    selector: 'main-page',
    styleUrls: ['./main.component.css', '../style.css'],
    templateUrl: './main.component.html',
})

export class MainComponent {
    date: any;
    constructor(
        private httpService: HttpService,
        private userService: UserService,
        private smileService: SmileService,
        
        //private socketService: SocketService
    ) { 
    }

    message: MessageComponent = new MessageComponent("", "");
    messages: MessageComponent[] = [];
    messagesAll: MessageComponent[] = [];
    messagesSocket: MessageComponent[] = [];
    user: UserComponent;
    userName: any = this.userService.getUserName();
    userId: any = this.userService.getUserId();
    showSmile: boolean = false;
    text: string;
    socket = new WebSocket("ws://localhost:3000");
    ob: any;

    ngOnInit() {
        this.httpService.getData({}).subscribe(
            (data: any) => {
                this.drewMessages(data)
            });
    }

    onChangeText(smile: string) {
        let withoutChanges = (document.getElementById("text") as HTMLInputElement).value;
        let withChanges = withoutChanges.concat(smile)
        this.message.text = withChanges
    }

    onSend() {
        this.socket.send(JSON.stringify({
            text: this.message.text,
            userName: this.userName,
            userId: this.userId,
            _creationDate: new Date()
        }
        ));

        this.socket.onmessage = (event) => {
            this.ob = JSON.parse(event.data);
            this.messages.push(this.ob);
          };

        setTimeout(() => {
            this.scroll();
        }, 0.1);

        this.httpService.addData({
            text: this.message.text,
            userName: this.userName,
            userId: this.userId
        }).subscribe(
            (data: any) => {
                // this.messages.push(data.newItem);
            }
        )
        this.message.text = "";
    }

    scroll() {
        let h = document.getElementById("message__wrapper-all").offsetHeight;
        document.getElementById("main__wrapper").scrollTo(0, h);
    }

    drewMessages(data: any) {
        for (let i = 0; i < data.items.length; i++) {
            data.items = this.sortData(data.items);
            this.messagesAll.push(data.items[i]);
            this.messages = this.messagesAll.slice(0, 20);
            this.messages = this.messages.reverse();
        }
    }

    sortData(data: any) {
        return data.sort((a: any, b: any) => {
            return <any>new Date(b._creationDate) - <any>new Date(a._creationDate);
        });
    }

    onShowSmile() {
        this.showSmile = !this.showSmile;
    }
}
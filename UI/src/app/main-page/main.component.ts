import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { UserService } from '../services/user.service';
import { SmileService } from '../services/smile.service';
import { FileService } from '../services/file.service';
import { MessageComponent } from '../message-page/message.component';
import { UserComponent } from '../user-page/user.component';
import { PassThrough } from 'stream';
import { FormControl, FormGroup } from '@angular/forms';
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
        private fileService: FileService,

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
    imgPath: string;

    file: File;
    formData: FormData = new FormData();
    inputForm: FormGroup = new FormGroup({
        "text": new FormControl("", [
        ]),
        "uploadFile": new FormControl("", [
        ])
    })

    public imagePath: any;

    ngOnInit() {
        this.httpService.getData({}).subscribe(
            (data: any) => {
                console.log('data');
                console.log(data);
                this.drewMessages(data)
            });
    }

    drewMessages(data: any) {
        for (let i = 0; i < data.length; i++) {
            for(let j = 0; j < data[i].messages.length; j++){
                this.message = data[i].messages[j];
                this.message['name'] = data[i].name
                this.messages.push(this.message);
                this.messages = this.sortData(this.messages);
                this.messages = this.messages.slice(0, 20);
                this.messages = this.messages.reverse();
            }
        }
    }

    sortData(data: any) {
        return data.sort((a: any, b: any) => {
            return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
        });
    }

    scroll() {
        let h = document.getElementById("message__wrapper-all").offsetHeight;
        document.getElementById("main__wrapper").scrollTo(0, h);
    }

    onShowSmile() {
        this.showSmile = !this.showSmile;
    }

    onChangeText(smile: string) {
        let withoutChanges = this.inputForm.controls.text.value;
        let withChanges = withoutChanges.concat(smile)
        this.inputForm.controls.text.setValue(withChanges);
    }

    addPhoto(event: any) {
        console.log('this.gile before append  = ' + this.file);
        let fileList: FileList = event.target.files;
        this.file = fileList[0];
        this.formData.append('uploadFile', this.file);
        console.log('this.gile after append  = ' + this.file);
    }

    onSend() {
        if (this.inputForm.controls.text.value != '' || this.file != undefined) {
            if (this.file != undefined) {
                this.imagePath = this.file.name;
            } else {
                this.imagePath = ''
            }

            this.socket.send(JSON.stringify({
                text: this.inputForm.controls.text.value,
                name: this.userName,
                userId: this.userId,
                createdAt: new Date(),
                img: this.imagePath
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
                text: this.inputForm.controls.text.value,
                userId: this.userId,
                img: this.imagePath
            }).subscribe(
                (data: any) => {
                    console.log(data)
                }
            )

            this.fileService.sendData(
                this.formData
            ).subscribe(
                (data: any) => {
                },
                error => {
                }
            )
            this.inputForm.reset();
            this.file = undefined;
            this.inputForm.controls.text.setValue('');
            this.formData.delete('uploadFile');
        }
    }
}
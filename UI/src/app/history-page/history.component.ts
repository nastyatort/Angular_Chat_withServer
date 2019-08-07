import { Component} from '@angular/core';
import {HttpService} from '../services/http.service';
import {MessageComponent} from '../message-page/message.component';
import { UserService } from '../services/user.service';

@Component({
    selector: 'history-page',
    styleUrls: ['./history.component.css', '../style.css'],
    templateUrl: './history.component.html'
})

export class HistoryComponent{
    constructor(
        private httpService: HttpService,
        private userService: UserService,
    ){}

    userId: any = this.userService.getUserId();
    message: MessageComponent = new MessageComponent("", "");
    messages: MessageComponent[] = [];

    ngOnInit(){    
        this.httpService.getData({}).subscribe(
            (data: any) =>{
                console.log(data);
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
            });
    }

    sortData(data: any) {
        return data.sort((a: any, b: any) => {
            return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
        });
    }
}


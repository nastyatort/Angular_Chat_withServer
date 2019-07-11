import { Component} from '@angular/core';
import { NgModel} from '@angular/forms';
import {UserComponent} from '../user-page/user.component';

  
@Component({
    selector: 'message-page',
    styleUrls: ['./message.component.css', '../style.css'],
    templateUrl: './message.component.html'
})

export class MessageComponent{
    public _id: any;
    public creationDate: any;
    constructor(
        public text: string,
        public userId: any
        )
    { }
}


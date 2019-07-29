import { Component} from '@angular/core';
import { NgModel} from '@angular/forms';
import {UserComponent} from '../user-page/user.component';

  
@Component({
    selector: 'phone-page',
    styleUrls: ['./phone.component.css', '../style.css'],
    templateUrl: './phone.component.html'
})

export class PhoneComponent{
    public _id: any;
    public userId: any;
    constructor(
        public title: string
        )
    { }
}


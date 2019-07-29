import { Component} from '@angular/core';
import { NgModel} from '@angular/forms';
import { LoginService} from '../services/login.service';
  
@Component({
    selector: 'user-page',
    styleUrls: ['./user.component.css', '../style.css'],
    templateUrl: './user.component.html'
})

export class UserComponent{
    public _id: any;
    private loginService: LoginService;
    constructor(
        public login: string,
        public pass: string
        ){}
        
}


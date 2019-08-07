import { Component} from '@angular/core';
import {UserService} from '../services/user.service'

@Component({
    selector: 'setting-page',
    styleUrls: ['./setting.component.css', '../style.css'],
    templateUrl: './setting.component.html'
})

export class SettingComponent{
    constructor(
        private userService: UserService,
    ){}

    name:string;

    ngOnInit(){
        this.name = this.userService.getUserName();
    }

}


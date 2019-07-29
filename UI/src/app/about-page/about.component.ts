import { NgModule }      from '@angular/core';
import { Component} from '@angular/core';
import { UserService} from '../services/user.service';
  
@Component({
    selector: 'about-page',
    styleUrls: ['./about.component.css', '../style.css'],
    templateUrl: './about.component.html'
})
export class AboutComponent { 
    constructor(
        private userService: UserService,
    ){}

    userName: string = '';
    date: Date;

    ngOnInit() {
        this.userName = this.userService.getUserName();
        this.date = new Date();
    }
}
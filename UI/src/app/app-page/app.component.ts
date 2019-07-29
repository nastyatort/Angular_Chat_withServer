import { Component} from '@angular/core';
import {LoginComponent} from '../login-page/login.component'
  
@Component({
    selector: 'app',
    styleUrls: ['./app.component.css', '../style.css'],
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(){}
    isLogoutData: any;
    showLogout: any;
    showLogoutUi: boolean = false;

    ngOnInit(){ 
        this.showLogout =  JSON.parse(localStorage.getItem("isLogged"));
        this.showLogoutUi = (this.showLogout.trigger);
    }

    logout(){
        this.isLogoutData = {
            trigger: false
        }
        localStorage.setItem("isLogged", JSON.stringify(this.isLogoutData));

        this.showLogout = JSON.parse(localStorage.getItem("isLogged"));
        this.showLogoutUi = (this.showLogout.trigger);
        console.log(this.showLogoutUi)
    }
}
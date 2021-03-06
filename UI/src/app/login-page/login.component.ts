import { Component} from '@angular/core';
import { HttpService} from '../services/http.service';
import { LoginService} from '../services/login.service';
import { OnInit} from '@angular/core';
import { Router, ActivatedRoute, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import {UserComponent} from '../user-page/user.component'
import { NgModel } from '@angular/forms';
import { AppComponent } from '../app-page/app.component'


@Component({
    selector: 'login-page',
    styleUrls: ['./login.component.css', '../style.css'],
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    constructor(
        private loginService: LoginService,
        private router: Router,
        private appComponent: AppComponent
        ){}

    user: UserComponent = new UserComponent("", "");
    returnUrl: string = "";
    errMessage: string = "";
    success: boolean = false;

    storageData: any;
    isLoggedData: any;

    ngOnInit() {
        this.returnUrl = '/main';
    }

    ngAfterViewInit(){
        this.isLoggedData = {
            trigger: false,
        }
        this.appComponent.showLogoutUi = this.isLoggedData.trigger;
        localStorage.setItem("isLogged", JSON.stringify(this.isLoggedData));
    }

    onLogin(login:NgModel, pass:NgModel){
        if(this.user.login != '' && this.user.pass != ''){

        this.loginService.sendData(
        {login: this.user.login, pass: this.user.pass}
        ).subscribe((res: any) => {
            console.log(res)
            if(res.success == true){
                this.router.navigate([this.returnUrl]);

                this.isLoggedData = {
                    trigger: true,
                }
                this.appComponent.showLogoutUi = this.isLoggedData.trigger;
                localStorage.setItem("isLogged", JSON.stringify(this.isLoggedData));

                this.storageData = {
                    loginUserId: res.user._id,
                    loginUserName: res.user.name
                }
                localStorage.setItem("userData", JSON.stringify(this.storageData));

            }else{
                this.errMessage = "Не верно указан логин или пароль"
            }
        })
    }else{
        this.errMessage = "Поля обязательны к заполнению"
    }        
    }
}
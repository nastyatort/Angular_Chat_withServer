import { Component} from '@angular/core';
import { RegistrationService} from "../services/registration.service";
import {UserComponent} from '../user-page/user.component';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IfStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AppComponent } from '../app-page/app.component'


@Component({
    selector: 'registration-page',
    styleUrls: ['./registration.component.css', '../style.css'],
    templateUrl: './registration.component.html'
})

export class RegistrationComponent{
    constructor(
        private registrationService:  RegistrationService,
        private appComponent: AppComponent
    ){}

    // user: UserComponent = new UserComponent("", "");

    login: string;
    pass: string;
    passRepeat: string;
    message: string;
    isLoggedData: any;

    registerForm : FormGroup = new FormGroup({
        "login": new FormControl("", [Validators.required]),
        "pass": new FormControl("", [Validators.required]),
        "passRepeat": new FormControl("", [Validators.required])
    });

    ngAfterViewInit(){
        this.isLoggedData = {
            trigger: false,
        }
        this.appComponent.showLogoutUi = this.isLoggedData.trigger;
        localStorage.setItem("isLogged", JSON.stringify(this.isLoggedData));
    }

    onSend(){
        this.login = this.registerForm.controls.login.value;
        this.pass = this.registerForm.controls.pass.value;
        this.passRepeat = this.registerForm.controls.passRepeat.value;
        if(this.pass == this.passRepeat && this.pass != '' && this.login != ''){
            this.registrationService.sendData({
                login: this.login,
                pass: this.pass
            }).subscribe((res: any) => {
                if(res.success == true){
                    this.message = "Вы зарегистрированы, вернитесь на логин"
                }else{
                    this.message = "Такой юзер уже существует"
                }
             })
        }else{
            this.message = "Введите корректные данные"
        }
    }
}
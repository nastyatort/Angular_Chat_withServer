import { Component} from '@angular/core';
import { UserService} from '../services/user.service';

import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
  
@Component({
    selector: 'userinfo-page',
    styleUrls: ['./userinfo.component.css', '../style.css'],
    templateUrl: './userinfo.component.html'
})

export class UserinfoComponent{
    constructor(
        private userService: UserService,
        ){}

        private firstName: any;
        private lastName: any;
        private email: any;
        private phone: any;
        private id: any;

        ngOnInit() {
            this.userService.getUserInfo({}).subscribe(
                (res: any) => {
                    console.log(res);
                    this.lastName = res.items[0].lastName;
                    this.firstName = res.items[0].firstName;
                    this.email = res.items[0].email;
                    this.phone = res.items[0].phone;
                    this.id = res.items[0]._id;
                }
            )
        }

        myForm : FormGroup = new FormGroup({
            "userName": new FormControl("", [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(20)
            ]),
            "userLastName": new FormControl("", [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(20)
            ]),
            "userEmail": new FormControl("", [
                Validators.required, 
                Validators.email
        ]),
            "userPhone": new FormControl("", [
                Validators.required,
                Validators.pattern("[0-9]{10}")
                
            ])
        });

        onUpdate(){
            this.firstName = this.myForm.controls.userName.value;
            this.lastName = this.myForm.controls.userLastName.value;
            this.email = this.myForm.controls.userEmail.value;
            this.phone = this.myForm.controls.userPhone.value;
        }

        submit(){
            this.userService.updateUserInfo({
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                phone: this.phone,
                _id: this.id
            }).subscribe(res => {
               console.log(res);
            })
        }

}


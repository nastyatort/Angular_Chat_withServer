import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { UserService } from '../services/user.service';
// import * as angular from 'angular'; 

import { ModalComponent } from '../modal-page/modal.component';

import { PhoneComponent } from '../phone-page/phone.component';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
    selector: 'main-page',
    styleUrls: ['./main.component.css', '../style.css'],
    templateUrl: './main.component.html',
    providers: [HttpService]
})

export class MainComponent {

    constructor(
        private httpService: HttpService,
        private userService: UserService,
    ) { }

    phone: PhoneComponent = new PhoneComponent("");
    phones: PhoneComponent[] = [];
    userId: any = this.userService.getUserId();
    phoneId: string;
    shouldDeletePhone: boolean = false;

    idForModal: string;
    idForAction: string;

    currentValue: string;

    ngOnInit() {
        this.httpService.getData({}).subscribe(
            (data: any) => {
                for (let i = 0; i < data.items.length; i++) {
                        this.phones.push(data.items[i]);
                }
            });
    }

    addPhone(title: NgModel) {
        if (title.model != '') {
            this.httpService.addData(
                {
                    title: this.phone.title,
                    userId: this.userId
                })
                .subscribe((res: any) => {
                    this.httpService.getData({}).subscribe(
                        (data: any) => {
                            this.phones = [];
                            for (let i = 0; i < data.items.length; i++) {
                                if (data.items[i].userId == this.userId) {
                                    this.phones.push(data.items[i]);
                                }
                            }
                        });
                });
        }
        console.log( this.idForAction)
        this.idForAction = '';
    }

    editPhone(id: string) {
        ((document.getElementById(id) as HTMLInputElement).disabled) = false;
        this.currentValue = (document.getElementById(id) as HTMLInputElement).value;
        this.idForAction = id;
    }

    savePhone(id: string) {
        let newText = ((document.getElementById(id) as HTMLInputElement).value);

        this.httpService.editData({
            title: newText,
            _id: id,
            userId: this.userId
        }).subscribe(res => {
            let editElement = this.phones.findIndex(x => x._id === id);
            this.phones.splice(editElement, 1, { title: newText, _id: id, userId: this.userId })
        })
        this.idForAction = '';
        this.idForModal = '';

        ((document.getElementById(id) as HTMLInputElement).disabled) = true;
    }

    cancelPhone(id: string) {
        ((document.getElementById(id) as HTMLInputElement).disabled) = true;
        (document.getElementById(id) as HTMLInputElement).value = this.currentValue;
        this.idForAction = '';
    }

    deletePhone(id: string) {
        console.log('ui id = ' + id);
        if (this.shouldDeletePhone == true) {
            this.httpService.deleteData(id).subscribe(res => {})
                let delElement = this.phones.findIndex(x => x._id == id);
                this.phones.splice(delElement, 1);
        }
    }

    showModal(id: string) {
        this.idForModal = id;
        this.phoneId = id;
        if ((document.getElementById(id + '__modal') as HTMLDialogElement)) {
            (document.getElementById(id + '__modal') as HTMLDialogElement).style.visibility = "visible"
        }
    }
}

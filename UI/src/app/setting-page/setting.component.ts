import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { SettingService } from '../services/setting.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FileService } from '../services/file.service';

@Component({
    selector: 'setting-page',
    styleUrls: ['./setting.component.css', '../style.css'],
    templateUrl: './setting.component.html'
})

export class SettingComponent {
    constructor(
        private settingService: SettingService,
        private userService: UserService,
        private fileService: FileService,
    ) { }

    name: string;
    userId: any = this.userService.getUserId();
    imagePath: string;
    file: File;
    formData: FormData = new FormData();
    inputForm: FormGroup = new FormGroup({
        "name": new FormControl(""),
        "uploadFile": new FormControl("")
    })



    ngOnInit() {
        this.settingService.getData({}).subscribe(
            (data: any) => {
                console.log('data');
                console.log(data);
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == this.userId) {
                        console.log('id = ' + data[i].id);
                        this.name = data[i].name;
                        this.imagePath = data[i].img
                    }
                }
            });
    }

    addPhoto(event: any) {
        console.log('this.gile before append  = ' + this.file);
        let fileList: FileList = event.target.files;
        this.file = fileList[0];
        this.formData.append('uploadFile', this.file);
        console.log('this.gile after append  = ' + this.file);
        this.imagePath = this.file.name;
    }


    onSend() {
        if(this.inputForm.controls.name.value != ''){
            this.name = this.inputForm.controls.name.value;
        }

        this.settingService.updateData({
            name: this.name,
            img: this.imagePath
        }).subscribe(
            (data: any) => {
                console.log('data update');
                console.log(data);
            });


            this.fileService.sendData(
                this.formData
            ).subscribe(
                (data: any) => {
                },
                error => {
                }
            )

    }

}


import { Component, Input} from '@angular/core';
import { NgModel} from '@angular/forms';

import { MainComponent} from '../main-page/main.component';
  
@Component({
    selector: 'modal-page',
    styleUrls: ['./modal.component.css', '../style.css'],
    templateUrl: './modal.component.html'
})

export class ModalComponent{
    constructor(
        private mainComponent: MainComponent,
    ){}

    @Input('id')
    id: string;
    
    private phoneId: string;

    showModal(){
        (document.getElementById(this.id + '__modal') as HTMLDialogElement).style.visibility = "visible"
    }

    closeModal(){
        (document.getElementById(this.id + '__modal') as HTMLDialogElement).style.visibility = "hidden"
    }

    deletePhone(){
        this.mainComponent.shouldDeletePhone = true;
        this.mainComponent.deletePhone(this.id);
        this.closeModal();
    }

}
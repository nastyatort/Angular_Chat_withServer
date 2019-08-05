import { Component} from '@angular/core';
import { NgModel} from '@angular/forms';
import {UserComponent} from '../user-page/user.component';
import {SmileService} from '../services/smile.service'
import {MainComponent} from '../main-page/main.component';

  
@Component({
    selector: 'smile-page',
    styleUrls: ['./smile.component.css', '../style.css'],
    templateUrl: './smile.component.html'
})

export class SmileComponent{

    constructor(
        private smileService: SmileService,
        private mainComponent: MainComponent,
    ){}

    smiles:any = [];
    choosenSmile: string;

    ngOnInit(){

        this.smileService.getData({}).subscribe(
            (data: any) => {
                for(let i = 0; i < data.items.length; i++){
                this.smiles.push(data.items[i].smile)
                }
            }
        )
    }

    chooseSmile(i:string){
        console.log(i);
        this.smileService.setSmile(i);
        this.mainComponent.onChangeText(i);
        this.mainComponent.showSmile = false
    }

}

import { Component} from '@angular/core';
import {HttpService} from '../services/http.service';
import {MessageComponent} from '../message-page/message.component';

@Component({
    selector: 'history-page',
    styleUrls: ['./history.component.css', '../style.css'],
    templateUrl: './history.component.html'
})

export class HistoryComponent{
    constructor(
        private httpService: HttpService,
    ){}

    messages: MessageComponent[] = [];

    ngOnInit(){    
        this.httpService.getData({}).subscribe(
            (data: any) =>{
                console.log(data);
                for(let i = 0; i < data.items.length; i++){
                    data.items = this.sortData(data.items);
                    this.messages.push(data.items[i]);
                   }
            });
    }

    sortData(data:any) {
        return data.sort((a:any, b:any) => {
          return <any>new Date(b._creationDate) - <any>new Date(a._creationDate);
        });
      }
}


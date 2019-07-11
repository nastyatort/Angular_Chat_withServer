import { Component} from '@angular/core';
import {HttpService} from '../services/http.service';
import {UserService} from '../services/user.service';
import {SmileService} from '../services/smile.service';
import {MessageComponent} from '../message-page/message.component';
import {UserComponent} from '../user-page/user.component';
// import {SmileComponent} from '../smile-page/smile.component';


@Component({
    selector: 'main-page',
    styleUrls: ['./main.component.css', '../style.css'],
    templateUrl: './main.component.html',
})

export class MainComponent{
    constructor(
        private httpService: HttpService,
        private userService: UserService,
        private smileService: SmileService
    ){}

    message: MessageComponent = new MessageComponent("", "");
    messages: MessageComponent[] = [];
    messagesAll: MessageComponent[] = [];
    user: UserComponent;
    userName: any = this.userService.getUserName();
    userId: any = this.userService.getUserId();
    showSmile: boolean = false;
    text: string;

    ngOnInit(){    
        this.httpService.getData({}).subscribe(
            (data: any) =>{
                this.drewMessages(data)
            });
    }
    
    timer:any = setInterval(() => {
        this.httpService.getData({}).subscribe(
            (data: any) => {
                if(this.messagesAll.length != data.items.length){
                    this.messagesAll = [];
                    this.drewMessages(data);
                }
            });
      }, 1000);

    onChangeText(smile:string){
        let withoutChanges = (document.getElementById("text") as HTMLInputElement).value;
        console.log(withoutChanges);
        let withChanges = withoutChanges.concat(smile)
        console.log(withChanges);
        this.message.text = withChanges
    }

    onSend(){
        this.httpService.addData({
            text: this.message.text,
            userName: this.userName,
            userId: this.userId
        }).subscribe(
            (data: any) => {
                this.messages.push(data.newItem);
                setTimeout(() => {
                    this.scroll();
                }, 0.1)
            }
        )
        this.message.text = ""
    }

    scroll(){
        let h = document.getElementById("message__wrapper-all").offsetHeight;
        document.getElementById("main__wrapper").scrollTo(0, h);
    }

    drewMessages(data:any){
        for(let i = 0; i < data.items.length; i++){
            data.items = this.sortData(data.items);
            this.messagesAll.push(data.items[i]);
            this.messages = this.messagesAll.slice(0, 20).reverse(); ;
           }
    }

    sortData(data:any) {
        return data.sort((a:any, b:any) => {
          return <any>new Date(b._creationDate) - <any>new Date(a._creationDate);
        });
      }
    
      onShowSmile(){
         this.showSmile = !this.showSmile;
      }
}
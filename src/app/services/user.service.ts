import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
  
@Injectable()
export class UserService{
  
    constructor(
      private http: HttpClient
    ){ } 

    private userId: any;
    private userName: any;

      getUserId(){
        this.userId = JSON.parse(localStorage.getItem("userData"));
        return this.userId.loginUserId;
      }

    getUserName(){
      this.userName = JSON.parse(localStorage.getItem("userData"));
        return this.userName.loginUserName;
    }
}
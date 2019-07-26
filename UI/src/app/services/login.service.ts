import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
  
@Injectable()
export class LoginService{
  
    constructor(private http: HttpClient){ } 

    private data: boolean = false;

    sendData(data: any){
        return this.http.post('http://localhost:8008/login', data); 
      }
}
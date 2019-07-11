import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
  
@Injectable()
export class HttpService{
  
    constructor(private http: HttpClient){ } 

    getData(data: any){
      return this.http.post('http://localhost:8008/api/message/get', data); 
    }

    addData(data: any){
      return this.http.post('http://localhost:8008/api/message/create', data); 
    }
}
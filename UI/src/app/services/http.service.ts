import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
  
@Injectable()
export class HttpService{
  
    constructor(private http: HttpClient){ } 

    getData(data: any){
      return this.http.get('http://localhost:8008/message', data); 
    }

    addData(data: any){
      return this.http.post('http://localhost:8008/message', data); 
    }
}
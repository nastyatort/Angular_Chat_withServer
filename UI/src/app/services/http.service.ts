import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
  
@Injectable()
export class HttpService{
  
    constructor(private http: HttpClient){ } 

    getData(data: any){
      return this.http.post('http://localhost:8008/phones/get', data); 
    }

    addData(data: any){
      return this.http.post('http://localhost:8008/phones/add', data); 
    }

    editData(data: any){
      return this.http.post('http://localhost:8008/phones/update', data); 
    }

    deleteData(id: any){
      return this.http.delete('http://localhost:8008/phones/delete/' + id); 
    }
}
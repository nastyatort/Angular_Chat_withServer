import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
  
@Injectable()
export class SettingService{
  
    constructor(private http: HttpClient){ } 

    getData(data: any){
      return this.http.get('http://localhost:8008/setting', data); 
    }

    updateData(data: any){
        return this.http.put('http://localhost:8008/setting', data); 
      }
}
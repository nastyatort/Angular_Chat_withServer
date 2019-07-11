import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
  
@Injectable()
export class SmileService{
  
    constructor(private http: HttpClient){ } 
    smile: string;

    getData(data: any){
      return this.http.post('http://localhost:8008/api/smile/get', data); 
    }

    setSmile(data:string){
        this.smile = data;
    }

    getSmile(){
        console.log(this.smile)
        return this.smile
    }
}
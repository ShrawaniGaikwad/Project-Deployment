import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
private _helpURL='https://server-1-yjew.onrender.com/help';
 constructor(private http: HttpClient){}

 getHelp(value:any){
  console.log("help",value);
  return this.http.post<any>(this._helpURL,value);
 }
}

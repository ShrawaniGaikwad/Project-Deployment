import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
private _helpURL='https://projectserver-s3a1.onrender.com/help';
private _contactURL = 'https://projectserver-s3a1.onrender.com/contact';
 constructor(private http: HttpClient){}

 getHelp(value:any){
  console.log("help",value);
  return this.http.post<any>(this._helpURL,value);
 }
 getContact(value : any)
 {
  console.log("contact",value);
  return this.http.post<any>(this._contactURL,value);
 }
}

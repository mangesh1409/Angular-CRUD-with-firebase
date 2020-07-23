import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { studentData } from './studentData';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  url="";
  constructor(private _http:HttpClient) { }

  sendNewEntry(data){
    return this._http.post(this.url,data);
    // return this._http.post(this.url,data);
  }
  getAllData(){
    return  this._http.get<studentData>(this.url).pipe(map(resData=>{
        // console.log(resData);
        const userArray=[];
         for(const key in resData){
          // console.log(key);
          // //  console.log(resData[key]);
          //  console.log(resData.hasOwnProperty(key));
           if(resData.hasOwnProperty(key)){
          userArray.push({userid:key,...resData[key]})
          }
        }
    return userArray}));
  }
  deleteEntry(id){
    //  console.log('');
    return this._http.delete('https);
  }
  updateEntry(id,data){
    return this._http.put('https://admissi);
  }

}

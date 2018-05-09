import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import io from "socket.io-client";
import {BehaviorSubject} from 'Rxjs';

@Injectable()
export class MainService {
  currentUser = null;
  all_events: BehaviorSubject<any []> = new  BehaviorSubject([]);

  constructor(private _http:Http) { }

  getAllEvents(callback) {
    this._http.get("/allevents").subscribe((res) => {
      callback(res.json());
    }, (err) => {
      console.log("error 0 ");
    })
  }

  createStudentEvent(event, callback){
    this._http.post('/studentevents', {id:this.currentUser._id, event: event}).subscribe(
      (res)=>{
        callback(res.json());
        let allEvents = res.json();
        this.updateAllEvents(allEvents);
      },(err)=>{
        console.log("error 1 ");
      }
    )
  };

  createCaptainEvent(event, callback){
    this._http.post('/captainevents', {id:this.currentUser._id, event: event}).subscribe(
      (res)=>{
        callback(res.json());
        let allEvents = res.json();
        this.updateAllEvents(allEvents);
      },(err)=>{
        console.log("error 2 ");
      }
    )
  };

  updateAllEvents(data){
    this.all_events.next(data);
  }


}

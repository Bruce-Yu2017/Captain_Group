import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import io from "socket.io-client";
import {BehaviorSubject} from 'Rxjs';

@Injectable()
export class MainService {
  currentUser = null;
  all_events: BehaviorSubject<any []> = new  BehaviorSubject([]);

  constructor(private _http:Http) { }

  createStudentEvent(id, event, callback){
    this._http.post('/studentevents', {id:id, event: event}).subscribe(
      (res)=>{
        callback(res.json());
        let allEvents = res.json();
        this.updateAllEvents(allEvents);
      },(err)=>{
        console.log("error 1 ");
      }
    )
  };

  createCaptainEvent(id, event, callback){
    this._http.post('/captainevents', {id:id, event: event}).subscribe(
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

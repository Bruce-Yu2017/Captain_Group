import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import io from "socket.io-client";
import { BehaviorSubject } from 'Rxjs';

@Injectable()
export class MainService {
  currentUser = null;

  all_events: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private _http: Http) {
    if (localStorage.currentUser !== undefined) {
      console.log(this.currentUser);
      this.currentUser = JSON.parse(localStorage.currentUser);
    }
  }

  registerCap(data, callback) {
    this._http.post('/register', data).subscribe(
      (res) => {
        console.log("from service register: ", res.json());
        callback(res.json());
        if (res.json().success == 'success') {
          this.currentUser = res.json().currentUser;
          localStorage.currentUser = JSON.stringify(res.json().currentUser);
        }
      },
      (err) => {
        console.log(err);
      }
    )
  }

  registerStudent(data, callback) {
    this._http.post('/register', data).subscribe(
      (res) => {
        console.log("from service register: ", res.json());
        callback(res.json());
        if (res.json().success == 'success') {
          this.currentUser = res.json().currentUser;
          localStorage.currentUser = JSON.stringify(res.json().currentUser);
        }
      },
      (err) => {
        console.log(err);
      }
    )
  }




  createStudentEvent(id, event, callback) {
    this._http.post('/studentevents', { id: id, event: event }).subscribe(
      (res) => {
        callback(res.json());
        let allEvents = res.json();
        this.updateAllEvents(allEvents);
      }, (err) => {
        console.log("error 1 ");
      }
    )
  };

  createCaptainEvent(id, event, callback) {
    this._http.post('/captainevents', { id: id, event: event }).subscribe(
      (res) => {
        callback(res.json());
        let allEvents = res.json();
        this.updateAllEvents(allEvents);
      }, (err) => {
        console.log("error 2 ");
      }
    )
  };

  updateAllEvents(data) {
    this.all_events.next(data);
  }


}

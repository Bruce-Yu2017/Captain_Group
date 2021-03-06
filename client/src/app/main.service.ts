import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import io from 'socket.io-client';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MainService {
  show = true;
  currentUser = null;

  all_events: BehaviorSubject<any[]> = new BehaviorSubject([]);
  loginstatus: BehaviorSubject<any[]> = new BehaviorSubject([]);
  scrollDownFromHeader: BehaviorSubject<any[]> = new BehaviorSubject([]);
  checkLogin: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private _http: Http) {
    if (localStorage.currentUser !== undefined) {
      this.currentUser = JSON.parse(localStorage.currentUser);
      console.log(this.currentUser);
      const data = [{
        user: this.currentUser,
        mesg: null
      }];
      this.updateLoginStatus(data);
    } else {
      const data = [{
        user: null,
        mesg: null
      }];
      this.updateLoginStatus(data);
    }
  }

  getAllEvents(callback) {
    this._http.get('/allevents').subscribe((res) => {
      callback(res.json());
    }, (err) => {
      console.log('error 0 ');
    });
  }

  registerCap(data, callback) {
    this._http.post('/register', data).subscribe(
      (res) => {
        console.log('from service register: ', res.json());
        callback(res.json());
        if (res.json().success === 'register pending') {
          console.log('success');
        }
      },
      (err) => {
        console.log(err);
      });
  }

  registerStudent(data, callback) {
    this._http.post('/register', data).subscribe(
      (res) => {
        console.log('from service register: ', res.json());
        callback(res.json());
        if (res.json().success === 'register pending') {
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  createStudentEvent(event, callback) {
    this._http.post('/studentevents', { id: this.currentUser._id, event: event }).subscribe(
      (res) => {

        callback(res.json());
        const allEvents = res.json();
        this.updateAllEvents(allEvents);
      }, (err) => {
        console.log('error 1 ');
      }
    );
  }

  createCaptainEvent(event, callback) {
    this._http.post('/captainevents', { id: this.currentUser._id, event: event }).subscribe(
      (res) => {

        callback(res.json());
        const allEvents = res.json();
        this.updateAllEvents(allEvents);
      }, (err) => {
        console.log('error 2 ');
      });
  }

  event_update(id, data, callback) {
    console.log('from service update: ', id, data);
    this._http.put('/update/' + id, {data: data}).subscribe(
      (res) => {
        console.log('res: ', res);
        callback(res.json());
      },
      (err) => {
        console.log('event_update err: ', err);
      });
  }

  updateAllEvents(data) {
    this.all_events.next(data);
  }

  updateLoginStatus(data) {
    this.loginstatus.next(data);
  }

  getPendingUser(token, callback) {
    this._http.get(`/activate_new/${token}`).subscribe((res) => {
      callback(res.json());
    }, (err) => {
      console.log('get pending user err: ', err);
    });
  }


  login(userdata, callback) {
    this._http.post('/login', userdata).subscribe(
      (res) => {
        callback(res.json());
        if (res.json().error === undefined) {
          this.currentUser = res.json();
          localStorage.currentUser = JSON.stringify(res.json());
          const data = [{
            user: this.currentUser,
            mesg: null
          }];
          this.updateLoginStatus(data);

        }
      },
      (err) => {
        console.log('error from login service: ', err);
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  delete_event(id, identity, callback) {
    console.log('event_id: ', id);
    this._http.delete(`/delete/${id}/${identity}`).subscribe((res) => {
      callback(res.json());
    }, (err) => {
      console.log('delete event err: ', err);
    });
  }
  delete_user(email, callback) {
    console.log('Email: ', email, 'CALLBACK: ', callback);
    this._http.delete(`/deleteUser/${email}`).subscribe((res) => {
      callback(res.json());
    }, (err) => {
      console.log('delete user err', err);
    });
  }
  forgetpw(email, callback) {
    console.log(email);
    this._http.post('/forgetpw', {email: email}).subscribe((res)=>{
      callback(res.json());
    },(err) => {
      if(err){
        console.log("forget password error", err);
      }
    });
  }
  resetpw(token, password, callback){
    this._http.put('resetpw', {token:token, password:password}).subscribe((res)=>{
      callback(res.json());
    },(err) => {
      console.log("reset password error", err);      
    });
  }
}

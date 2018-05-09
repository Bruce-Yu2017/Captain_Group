import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-reg-pending',
  templateUrl: './reg-pending.component.html',
  styleUrls: ['./reg-pending.component.css']
})
export class RegPendingComponent implements OnInit {
  user_name;
  error_message = {
    email: "",
    login: "",
    code: 0
  }

  user_log = {
    email: "",
    password: ""
  }
  constructor(private _service: MainService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this._service.getPendingUser(params.get("token"), (res) => {
        this.user_name = res.user.name;
      })
    })
  }

  login() {
    this._service.login(this.user_log,
      (res) => {
        if (res.error == undefined) {
          this._router.navigate(['/']);
        }
        else {
          this.error_message.login = res.error;
          if (res.errorCode != undefined) {
            this.error_message.code = res.errorCode;
          }
        }
      });
    this.user_log = {
      email: "",
      password: ""
    };
  }

}

import { Component, OnInit } from '@angular/core';
import { MainService } from "./../main.service";
import { Router } from "@angular/router";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  captain_reg = {
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    password: ""
  }

  student_reg = {
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    password: ""
  }

  err_message = {
    email: "",
    password: ""
  }

  pass_con;

  constructor(private _service: MainService, private _router: Router) { }

  capReg() {
    console.log('cap reg component', this.captain_reg);
    this._service.registerCap(this.captain_reg, (res) => {
      if (res.success = 'success') {
        this._router.navigate(['/create'])
      }
      else {
        this.err_message.email = 'This email has been registered';
      }
      this.captain_reg = {
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        password: ""
      }
      this.pass_con = "";
    })
  }

  studentReg() {
    console.log('student reg component', this.student_reg);
    this._service.registerStudent(this.student_reg, (res) => {
      if (res.success = 'success') {
        this._router.navigate(['/create'])
      }
      else {
        this.err_message.email = 'This email has been registered';
      }
      this.student_reg = {
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        password: ""
      }
    })
  }

  ngOnInit() {
    $('#student').hide();
    $('#reg1').hide();

    $('#reg1').click(function () {
      $('#student').hide(100);
      $('#cap').show(100);
      $('#reg1').hide();
      $('#reg2').show();
    })
    $('#reg2').click(function () {
      $('#student').show(100);
      $('#cap').hide(100);
      $('#reg1').show();
      $('#reg2').hide();

    })
  }


}

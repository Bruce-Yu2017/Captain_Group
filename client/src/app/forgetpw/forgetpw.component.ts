import { Component, OnInit } from '@angular/core';
import { MainService } from "./../main.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-forgetpw',
  templateUrl: './forgetpw.component.html',
  styleUrls: ['./forgetpw.component.css']
})
export class ForgetpwComponent implements OnInit {
  inputEmail;
  error_message = null;
  getEmail = false;


  constructor(private _service: MainService, private _router: Router) { }

  ngOnInit() {
  
}

forgetpw(){
  console.log(this.inputEmail);
  this._service.forgetpw(this.inputEmail, (res)=> {
    if(res.err){
      this.error_message = res.err;
    }else if(res.succ == "success send recovery link." ) {
      this.getEmail=true;
    }
  })
    
    
}

}

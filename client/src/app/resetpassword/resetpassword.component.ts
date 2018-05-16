import { Component, OnInit } from '@angular/core';
import { MainService } from "./../main.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  inputpassword;
  error_message = null;
  passwordset = false;
  token;
  resetpwUser;

  constructor(private _service: MainService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._route.paramMap.subscribe((params) => {
      this.token = params.get("token");      
    })
    
  }
  resetpw(){
    console.log(this.inputpassword);
    this._route.paramMap.subscribe(params => {
      this._service.resetpw(this.token, this.inputpassword, (res) => {
        this._router.navigate(["/"]);
      }); 
    })
  }
}

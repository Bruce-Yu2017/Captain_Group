import { Component, OnInit } from '@angular/core';
import { init } from 'ityped';
import { MainService } from "./../main.service";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _service: MainService) { }

  ngOnInit() {
    $('#return-to-top').hide();
    $(window).scroll(function () {
      var scrollval = $(window).scrollTop();
      if(scrollval > 100) {
        $('#return-to-top').fadeIn('slow');
      }
      else {
        $('#return-to-top').fadeOut('fast');
      }
    })
  }

  arrowClick(event) {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });

  }

  scrollToCalendar() {
    this._service.scrollDownFromHeader.next(["Tocalendar"]);
  }

  display_login() {
    let data = [{
      user: null,
      mesg: "log"
    }]
    this._service.updateLoginStatus(data);
  }


}

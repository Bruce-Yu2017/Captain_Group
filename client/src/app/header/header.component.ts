import { Component, OnInit } from '@angular/core';
import { init } from 'ityped';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

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
    console.log('BUTTON');
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });

  }


}

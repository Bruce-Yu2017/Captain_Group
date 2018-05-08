import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
      var date = new Date();
  
      $('#calendar').fullCalendar({
        editable: true,
        weekMode: 'liquid',
        url: '#',
        eventClick: function(e) {
          alert(e.title);
        },
        events: [{
          title: 'Project start',
          start: new Date(2018, 4, 7, 9, 0o0),
          end: new Date(2018, 4, 7, 10, 0o0),
          allDay: false
        }],
  
        dayClick: function() {
          alert('a day has been clicked!');
        }
      });
    
  }

}

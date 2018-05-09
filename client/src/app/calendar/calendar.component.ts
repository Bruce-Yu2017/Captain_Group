import { Component, OnInit } from '@angular/core';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { MainService } from '../main.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  date_display;
  id;
  student = {
    date: null,
    timeFrom: null,
    timeTo: null,
    message: "",
  }
  captain = {
    date: null,
    timeFrom: null,
    timeTo: null,
    vessel: "",
    spec: "",
    NumOfCrew: Number,
    message: "",
  }
  
  constructor(private atp: AmazingTimePickerService, private _service: MainService) { }

  ngOnInit() {

    this._service.getAllEvents((res) => {
      this.display_calendar(res);
    })
    
    
  }
  update_event(events) {
    $('#calendar').fullCalendar("removeEvents");
    $('#calendar').fullCalendar('addEventSource', events);
    $('#calendar').fullCalendar('rerenderEvents');
    
  }

  
  student_submit() {
    this._service.createStudentEvent(this.student, (res) => {
      this.closeModal()
    });
  }
  captain_submit() {
    this._service.createCaptainEvent(this.captain, (res) => {
      this.closeModal()
    });
  }

  closeModal() {
    $(".modal").fadeOut();
    this.student = {
      date: null,
      timeFrom: null,
      timeTo: null,
      message: "",
    }
    this.captain = {
      date: null,
      timeFrom: null,
      timeTo: null,
      vessel: "",
      spec: "",
      NumOfCrew: Number,
      message: "",
    }
  }

  timeFrom() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
      this.student.timeFrom = time;
    });
  }
  timeTo() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
      this.student.timeTo = time;
    });
  }

  student_req() {
    document.getElementById('myModal1').style.display = "none";
    $("#myModal2").fadeIn();
  }
  captain_req() {
    document.getElementById('myModal1').style.display = "none";
    $("#myModal3").fadeIn();
  }

  

  display_calendar(eventsData) {
    var modal0 = document.getElementById('myModal0');
    var modal1 = document.getElementById('myModal1');
    var modal2 = document.getElementById('myModal2');
    window.onclick = function (event) {
      if (event.target == modal1 || event.target == modal2 || event.target == modal0) {
        $("#myModal0").fadeOut();
        $("#myModal1").fadeOut();
        $("#myModal2").fadeOut();
      }
    }
    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        // right: 'month'
      },
      selectable: true,
      selectHelper: true,
      // editable: true,
      eventLimit: true,
      weekMode: 'liquid',
      url: '#',
      editable: true,
      eventClick: function (e) {
        $("#myModal0").fadeIn();
        $("#title").html(`${e.title}`);
        $("#content").html(`Created at: ${new Date(2018, 4, 7, 9, 0o0)}`);
      },
      events: eventsData,

      dayClick: (e) => {
        this.student.date = e;
        this.captain.date = e;
        this.date_display = e.format()
        $("#myModal1").fadeIn();
      }
    });

  }






  

}

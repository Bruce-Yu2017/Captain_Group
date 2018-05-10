import { Component, OnInit } from '@angular/core';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { MainService } from '../main.service';
import * as moment from 'moment';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  date_display;
  student = {
    title: "",
    date: null,
    timeFrom: null,
    timeTo: null,
    message: "",
  }
  captain = {
    title: "",
    date: null,
    timeFrom: null,
    timeTo: null,
    vessel: "",
    spec: "",
    NumOfCrew: Number,
    message: "",
  }
  loginUser = "none";
  
  constructor(private atp: AmazingTimePickerService, private _service: MainService) { }

  ngOnInit() {
    this._service.getAllEvents((res) => {
      this.display_calendar(res);
    }) 

    this._service.loginstatus.subscribe(
      (data) => {
        console.log('data: ', data);
        if(data[0].user != null){
          this.loginUser = data[0].user.identity;
        }
        if(data[0].user == null){
          this.loginUser = "none";
        }
      });
    
  }

  update_event(events) {
    $('#calendar').fullCalendar("removeEvents");
    $('#calendar').fullCalendar('addEventSource', events);
    $('#calendar').fullCalendar('rerenderEvents');
  }

  
  student_submit() {
    this.student.title = this._service.currentUser.name + " seeking Vessel!";
    this._service.createStudentEvent(this.student, (res) => {
      console.log('res: ', res);
      this.closeModal();
      this.update_event(res);
    });
  }
  captain_submit() {
    this.captain.title = this._service.currentUser.name + " seeking Crew!";
    this._service.createCaptainEvent(this.captain, (res) => {
      console.log('res: ', res);
      this.closeModal();
      this.update_event(res);
    });
  }

  closeModal() {
    $(".modal").fadeOut();
    this.student = {
      title: "",
      date: null,
      timeFrom: null,
      timeTo: null,
      message: "",
    }
    this.captain = {
      title: "",
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
      this.captain.timeFrom = time;
    });
  }
  timeTo() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
      this.student.timeTo = time;
      this.captain.timeTo = time;
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

        if(e.spec !== undefined) {
          $("#myModal0").fadeIn();
          $("#date").html(`He/She would like to set sail in: ${e.date.slice(0, 10)}`);
          $("#title").html(`${e.title}`);
          $("#timeRange").html(`Set sail between: ${e.timeFrom} to ${e.timeTo}`);
          $("#vessel").html(`Vessel: ${e.vessel}`);
          $("#numCrew").html(`Number of Crew is seeking: ${e.NumOfCrew}`);
          $("#Message").html(`Captains Log (Message): ${e.message}`);
        }
        else {
          $("#myModal0").fadeIn();
          $("#date").html(`He/She would like to set sail in: ${e.date.slice(0, 10)}`);
          $("#title").html(`${e.title}`);
          $("#timeRange").html(`Set sail between: ${e.timeFrom} to ${e.timeTo}`);
          $("#Message").html(`Message to Would-be Captains: ${e.message}`);
        }

      },
      events: eventsData,

      dayClick: (date, jsEvent, view) => {
        if (moment().format('YYYY-MM-DD') === date.format('YYYY-MM-DD') || date.isAfter(moment())) {
          this.student.date = date;
          this.captain.date = date;
          this.date_display = date.format()
          $("#myModal1").fadeIn();
        }
        
      },
      
    });
    

  }

  req_login(state){
    if(state == 'reg'){
      let data = [{
        user: null,
        mesg: state
      }]
      this._service.updateLoginStatus(data);
    }else if(state == 'log'){
      let data = [{
        user: null,
        mesg: state
      }]
      this._service.updateLoginStatus(data);
    }else{
      return;
    }
    $("#myModal1").fadeOut();
  }




  

}

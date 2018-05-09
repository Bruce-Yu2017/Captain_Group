import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { HttpModule } from '@angular/http';
import { MainService } from './main.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { DisplayComponent } from './display/display.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    DisplayComponent,
    CalendarComponent,
  ],
  imports: [

  BrowserModule,
    AppRoutingModule,
    AmazingTimePickerModule,

    BrowserModule,
    AppRoutingModule,

    FormsModule,
    HttpModule,
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }

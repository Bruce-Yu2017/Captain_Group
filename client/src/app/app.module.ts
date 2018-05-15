import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MainService } from './main.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { DisplayComponent } from './display/display.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { RegPendingComponent } from './reg-pending/reg-pending.component';
import { CheckEmailComponent } from './check-email/check-email.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    DisplayComponent,
    CalendarComponent,
    RegPendingComponent,
    CheckEmailComponent,
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

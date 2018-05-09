import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { RegPendingComponent } from './reg-pending/reg-pending.component';
import { CheckEmailComponent } from './check-email/check-email.component';

const routes: Routes = [
  { path:'', component: NavbarComponent },
  { path:'activate/:token', component: RegPendingComponent },
  { path: 'check_email', component: CheckEmailComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

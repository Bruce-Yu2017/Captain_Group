import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { RegPendingComponent } from './reg-pending/reg-pending.component';
import { CheckEmailComponent } from './check-email/check-email.component';
import { ForgetpwComponent } from './forgetpw/forgetpw.component'
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

const routes: Routes = [
  { path: '', component: NavbarComponent },
  { path: 'activate/:token', component: RegPendingComponent },
  { path: 'check_email', component: CheckEmailComponent },
  { path: 'forgetpw', component: ForgetpwComponent },
  { path:'reset/:token', component: ResetpasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

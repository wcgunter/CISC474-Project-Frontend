import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { TimesheetViewerComponent } from './timesheet-viewer/timesheet-viewer.component';
import { RegisterComponent } from './register/register.component';
import { ClockComponent } from './clock/clock.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'timesheet-viewer', component: TimesheetViewerComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'clock', component: ClockComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

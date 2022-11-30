import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';

//All material components
import { MaterialModule } from './material/material.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { TimesheetViewerComponent } from './timesheet-viewer/timesheet-viewer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityHttpInterceptor } from './services/security-http.interceptor';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { RegisterComponent } from './register/register.component';
=======
import { ClockComponent } from './clock/clock.component';

>>>>>>> tommy-clock-in-out

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ToolbarComponent,
    LoginFormComponent,
<<<<<<< HEAD
    TimesheetViewerComponent,
    RegisterComponent
=======
    ClockComponent
>>>>>>> tommy-clock-in-out
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: SecurityHttpInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

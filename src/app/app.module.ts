import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursedetailsComponent } from './coursedetails/coursedetails.component';
import { AttendanceComponent } from './attendance/attendance.component';

import { CoursedetailsService } from './coursedetails.service';
import { HttpClientModule } from '@angular/common/http';
import { ClientComponent } from './client/client.component';
import { FaqqComponent } from './faqq/faqq.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursedetailsComponent,
    AttendanceComponent,
    ClientComponent,
    FaqqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CoursedetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

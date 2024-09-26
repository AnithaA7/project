import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursedetailsComponent } from './coursedetails/coursedetails.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { FaqqComponent } from './faqq/faqq.component';
import { ClientComponent } from './client/client.component';

const routes: Routes = [
  { path: 'coursedetails', component: CoursedetailsComponent },
  { path: 'attendance', component: AttendanceComponent },
  {path:'faq',component:FaqqComponent},
  {path:'client',component:ClientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

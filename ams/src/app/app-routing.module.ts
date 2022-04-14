import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddtimesheetComponent } from './addtimesheet/addtimesheet.component';
import { ManagerViewTimesheetComponent } from './manager-view-timesheet/manager-view-timesheet.component';
import { CalenderComponent } from './calender/calender.component';
import { MasterComponent } from './master/master.component';
import { ViewtimesheetComponent } from './viewtimesheet/viewtimesheet.component';

const routes: Routes = [
  { path: 'calender', component: CalenderComponent },
  { path: 'addTimeSheet', component: AddtimesheetComponent },
  { path: 'master', component: MasterComponent },
  { path: 'viewTimeSheet', component: ViewtimesheetComponent },
  { path: 'managerviewTimeSheet', component: ManagerViewTimesheetComponent },
  { path: '**', redirectTo: 'master' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  
 }
 

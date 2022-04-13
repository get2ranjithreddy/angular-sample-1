import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddtimesheetComponent } from './addtimesheet/addtimesheet.component';
<<<<<<< HEAD
import { ManagerViewTimesheetComponent } from './manager-view-timesheet/manager-view-timesheet.component';
=======
import { CalenderComponent } from './calender/calender.component';
>>>>>>> a49a9fa97e27ba3a2871b3983a81aaf57bc02b3f
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
 

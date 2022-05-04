import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddtimesheetComponent } from './addtimesheet/addtimesheet.component';
import { ManagerViewTimesheetComponent } from './manager-view-timesheet/manager-view-timesheet.component';
import { CalenderComponent } from './calender/calender.component';
import { MasterComponent } from './master/master.component';
import { ViewtimesheetComponent } from './viewtimesheet/viewtimesheet.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { HolidayComponent } from './holiday/holiday.component';
 

const routes: Routes = [
  { path: 'calender', component: CalenderComponent , canActivate : [AuthGuard]},
  { path: 'addTimeSheet', component: AddtimesheetComponent , canActivate : [AuthGuard]},
  { path: 'holiday', component: HolidayComponent  },
  { path: 'viewTimeSheet', component: ViewtimesheetComponent , canActivate : [AuthGuard]},
  { path: 'managerviewTimeSheet', component: ManagerViewTimesheetComponent, canActivate : [AuthGuard]},
  { path: 'login', component: LoginComponent  },
  { path: 'logout', component: LogoutComponent  },
  { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  
 }
 

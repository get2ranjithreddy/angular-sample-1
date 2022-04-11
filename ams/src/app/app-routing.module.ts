import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddtimesheetComponent } from './addtimesheet/addtimesheet.component';
import { CalenderComponent } from './calender/calender.component';
import { MasterComponent } from './master/master.component';

const routes: Routes = [
  { path: 'calender', component: CalenderComponent },
  { path: 'addTimeSheet', component: AddtimesheetComponent },
  { path: 'master', component: MasterComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
 

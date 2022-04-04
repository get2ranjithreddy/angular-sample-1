import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddtimesheetComponent } from './addtimesheet/addtimesheet.component';
import { MasterComponent } from './master/master.component';

const routes: Routes = [
  { path: 'addTimeSheet', component: AddtimesheetComponent },
  { path: 'master', component: MasterComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(
    [{ path: 'addTimeSheet', component: AddtimesheetComponent },
  { path: 'master', component: AddtimesheetComponent }])],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
 

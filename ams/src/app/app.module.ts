import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MasterComponent } from './master/master.component';
import { AddtimesheetComponent } from './addtimesheet/addtimesheet.component';
import { HttpClientModule } from '@angular/common/http';
<<<<<<< HEAD
import { CommonModule, DatePipe } from '@angular/common';
import { ViewtimesheetComponent } from './viewtimesheet/viewtimesheet.component';
import { DataTablesModule } from 'angular-datatables';
import { ManagerViewTimesheetComponent } from './manager-view-timesheet/manager-view-timesheet.component';
=======
import { DatePipe } from '@angular/common';
import { CalenderComponent } from './calender/calender.component';
>>>>>>> a49a9fa97e27ba3a2871b3983a81aaf57bc02b3f

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    AddtimesheetComponent,
<<<<<<< HEAD
    ViewtimesheetComponent,
    ManagerViewTimesheetComponent
=======
    CalenderComponent
>>>>>>> a49a9fa97e27ba3a2871b3983a81aaf57bc02b3f
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

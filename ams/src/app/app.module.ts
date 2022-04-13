import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MasterComponent } from './master/master.component';
import { AddtimesheetComponent } from './addtimesheet/addtimesheet.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { ViewtimesheetComponent } from './viewtimesheet/viewtimesheet.component';
import { DataTablesModule } from 'angular-datatables';
import { ManagerViewTimesheetComponent } from './manager-view-timesheet/manager-view-timesheet.component';

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    AddtimesheetComponent,
    ViewtimesheetComponent,
    ManagerViewTimesheetComponent
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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MasterComponent } from './master/master.component';
import { AddtimesheetComponent } from './addtimesheet/addtimesheet.component';

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    AddtimesheetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [MasterComponent]
})
export class AppModule { }

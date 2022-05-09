import {  Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TimesheetService } from '../services/timesheet.service';
import { Subject } from 'rxjs';

import {  FormGroup,  Validators } from "@angular/forms";

declare var $: any;

@Component({
  selector: 'app-viewtimesheet',
  templateUrl: './viewtimesheet.component.html',
  styleUrls: ['./viewtimesheet.component.css']
})

export class ViewtimesheetComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  fg: FormGroup;
  fromdate: string = '';
  todate: string = '';
  employeeId: any = null;
  data: any = [];
  timesheetData: any[] = [];
  constructor(private datePipe: DatePipe, private fb: FormBuilder, private timeSheetService: TimesheetService) {
    this.fg = this.fb.group({
      dateTo: ['', Validators.required],
      dateFrom: ['', Validators.required]
    }, { validator: this.dateLessThan('dateFrom', 'dateTo') });
    // this.datePipeString = datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }
  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from];
      let t = group.controls[to];
      this.fromdate = f.value;
      this.todate = t.value;
      if (f.value > t.value) {
        return {
          dates: "Date from should be less than Date to"
        };
      }
      return {};
    }
  }

  ngOnInit(): void {
    var myCurrentDate = new Date();
    var myPastDate = new Date(myCurrentDate);
    myPastDate.setDate(myPastDate.getDate() - 15);
    this.GetEmployeeAttendanceSummary(myPastDate.toString(), myCurrentDate.toString());
  }

  onSubmit() {
    this.GetEmployeeAttendanceSummary(this.fromdate, this.todate);
  }

  GetEmployeeAttendanceSummary(myCurrentDate: String, myPastDate: String) {
    this.dtOptions = {};
    this.dtTrigger = new Subject();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.data = [];
    this.employeeId = localStorage.getItem("Id");
    this.timeSheetService.getGetEmployeeAttendanceSummary(this.employeeId, myCurrentDate.toString(), myPastDate.toString())
      .subscribe((response: any) => {
        this.data.push(response);
        console.log(this.data);
        var Role = localStorage.getItem("UserRole");
        if (Role == "Employee") {
          this.timesheetData = this.data[0].EmployeeWeekAttendances;
        }
        else {
          this.timesheetData = this.data[0].ManagerWeekAttendances;
        }

        this.dtTrigger.next(0);
        if (this.timesheetData.length == 0) {
          $('#exampleTable_info').hide();
          $('#exampleTable_paginate').hide()
        }
        else {
          $('#exampleTable_info').show();
          $('#exampleTable_paginate').show();
        }
      });
  }

  ngOnDestroy(): void {    
    this.dtTrigger.unsubscribe();
  }
}



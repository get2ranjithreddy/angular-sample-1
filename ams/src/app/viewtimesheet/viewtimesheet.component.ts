import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler/src/core';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TimesheetService } from '../services/timesheet.service';

import { Subject } from 'rxjs';

import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { DataTableDirective } from 'angular-datatables';
import { EmployeeAttendanceWeekSummary } from './EmployeeAttendanceWeekSummaryEntries.Model';

declare var $: any;

@Component({
  selector: 'app-viewtimesheet',
  templateUrl: './viewtimesheet.component.html',
  styleUrls: ['./viewtimesheet.component.css']
})

export class ViewtimesheetComponent implements OnInit , OnDestroy{
  // @ViewChild(DataTableDirective, { static: false })
  // dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  fg: FormGroup;
  fromdate: string = "";
  this: any;
  // datePipeString: any;
  data: any = [];
  todate: string = "";
  timesheetData: EmployeeAttendanceWeekSummary[] = [];
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
   
    // this.dtOptions = {
    //   ajax: 'data/data.json',
    //   columns: [{
    //     title: 'Week Number',
    //     data: 'WeekNumberd'
    //   }, {
    //     title: 'Start Date',
    //     data: 'StartDate'
    //   }, {
    //     title: 'End Date',
    //     data: 'EndDate'
    //   },
    //   {
    //     title: 'Total WorkingHours',
    //     data: 'TotalWorkingHours'
    //   },
    //   {
    //     title: 'Status',
    //     data: 'EndDate'
    //   }]
    // };
    var myCurrentDate = new Date();
    var myPastDate = new Date(myCurrentDate);
    myPastDate.setDate(myPastDate.getDate() - 15);
    this.GetEmployeeAttendanceSummary(myPastDate.toString(), myCurrentDate.toString());
  }

  onSubmit() {     
    // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    //   // Destroy the table first
    //   dtInstance.destroy();
    //   // Call the dtTrigger to rerender again
    //   this.dtTrigger.next(0);
    // });
    this.GetEmployeeAttendanceSummary(this.fromdate, this.todate);
    // this.data = this.data.filter((item: any) => {
    //   debugger;
    //   let endDate = new Date(item.endDate);
    //   var fromdate = new Date(this.fromdate);
    //   let todate = new Date(this.todate);
    //   return endDate >= fromdate && endDate <= todate
    // })
  }
  private dateRangeValidator: ValidatorFn = (): {
    [key: string]: any;
  } | null => {
    let invalid = false;
    debugger;
    const from = this.fg.value.from;
    const to = this.fg.value.to;
    if (from && to) {
      invalid = new Date(from).valueOf() > new Date(to).valueOf();
    }
    return invalid ? { invalidRange: { from, to } } : null;
  };

  GetEmployeeAttendanceSummary(myCurrentDate: String, myPastDate: String) {      
    this.dtOptions = {};
    this.dtTrigger = new Subject();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.data = [];
    this.timeSheetService.getGetEmployeeAttendanceSummary("d434401b-9912-419b-9c87-f2dc8f54049d", myCurrentDate.toString(), myPastDate.toString())
      .subscribe((response: any) => {         
        // console.log(response);
        this.data.push(response);        
        this.timesheetData = this.data[0].EmployeeAttendanceWeekSummaryEntries;
        this.dtTrigger.next(0);
        if(this.timesheetData.length == 0)
        {        
          $('#exampleTable_info').hide();
          $('#exampleTable_paginate').hide()
        }
        else{           
          $('#exampleTable_info').show();
          $('#exampleTable_paginate').show();
        }
      });
  }
  // ngAfterViewInit(): void {
  //   this.dtTrigger.next(0);
  // }
   

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}



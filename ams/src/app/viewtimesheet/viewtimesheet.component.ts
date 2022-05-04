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
import { EmployeeWeekAttendances } from './EmployeeWeekAttendances.model';

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
  // datePipeString: any;
  data: any = [];
  todate: string = "";
  timesheetData:  any[] = [];
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
    this.timeSheetService.getGetEmployeeAttendanceSummary("be971494-5677-4960-ac59-fa3acb1aa662", myCurrentDate.toString(), myPastDate.toString())
      .subscribe((response: any) => {  
        this.data.push(response);    
        console.log(this.data);   
        this.timesheetData = this.data[0].EmployeeWeekAttendances;
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
 
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}



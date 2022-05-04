import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { TimesheetService } from '../services/timesheet.service';
import { Employee } from './Employee.Model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-manager-view-timesheet',
  templateUrl: './manager-view-timesheet.component.html',
  styleUrls: ['./manager-view-timesheet.component.css']
})
export class ManagerViewTimesheetComponent implements OnInit {
  timesheetData: any = [];
  selectedDevice: any = "";
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  Employees: Employee[] = [];
  data: any = [];
  employeeId: string = "8701b3ab-2d69-4d84-a437-e9ef6157ecc1";
  Employeeattendacedata: any[] = [];
  fg: FormGroup;
  constructor(private timeSheetService: TimesheetService , private fb : FormBuilder) { 

    this.fg = this.fb.group({       
      selectEmployee:  ['', Validators.required]
      });
  }

  ngOnInit(): void {
    this.getAllEmployeesList();
    this.getEmployeeAttendanceData();
  }
  // form = new FormGroup({
  //   website: new FormControl(['', Validators.required])
  // });

  get f() {
    return this.fg.controls;
  }
  selectEmployee(e: any) {
    //this.employeeId = e.target.value;
    console.log(e.target.value);
  }
  onSelect(selectedItem: any) {
    var objEmployeeAttendanceStatus = {
      employeeId: this.employeeId,
      year: selectedItem.Year,
      weekNumber: selectedItem.WeekNumber,
      status: true
    };
    this.timeSheetService.UpdateEmployeeAttendanceStatus(objEmployeeAttendanceStatus)
      .subscribe((response: any) => {
        // console.log("Approved : " + response);
        alert("Status Updated Successfully");
      });
      this.getEmployeeAttendanceData();
  }

  onReject(selectedItem: any) {
    var objEmployeeAttendanceStatus = {
      employeeId: this.employeeId,
      year: selectedItem.Year,
      weekNumber: selectedItem.WeekNumber,
      status: false
    };
    this.timeSheetService.UpdateEmployeeAttendanceStatus(objEmployeeAttendanceStatus)
      .subscribe((response: any) => {         
          console.log("Approved : " + response);
         alert("Status Rejected Successfully"); 
         this.getEmployeeAttendanceData();        
      });
      
    // console.log("Selected item Id: ", selectedItem.WeekNumber, selectedItem.Year); // You get the Id of the selected item here
  }
  getAllEmployeesList() {
    this.timeSheetService.getAllEmployeesForManager("a6fb32e4-44dd-7a57-074c-6ff01f7c298b")
      .subscribe((response: any) => {
        this.data.push(response);
        this.Employees = this.data[0];
      });
  }

  getEmployeeAttendanceData() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.timeSheetService.getEmployeeAttendanceDataByEmployeeID(this.employeeId)
      .subscribe((response: any) => {
        this.Employeeattendacedata.push(response);
        this.dtTrigger.next(0);
        console.log(this.Employeeattendacedata);
      });
  }
}


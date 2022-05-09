import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TimesheetService } from '../services/timesheet.service';
import { Employee } from './Employee.Model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-manager-view-timesheet',
  templateUrl: './manager-view-timesheet.component.html',
  styleUrls: ['./manager-view-timesheet.component.css']
})
export class ManagerViewTimesheetComponent implements OnInit {
  timesheetData: any = [];
  selectedDevice: any = null;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  Employees: Employee[] = [];
  data: any = [];
  employeeId: string = '';
  Employeeattendacedata: any[] = [];
  fg: FormGroup;
  constructor(private timeSheetService: TimesheetService, private fb: FormBuilder) {
    this.fg = this.fb.group({
      selectEmployee: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    var UserId = localStorage.getItem("Id");
    this.getAllEmployeesList(UserId);
    $('#exampleTable').hide();
  }

  get f() {
    return this.fg.controls;
  }
  selectEmployee(e: any) {
    this.employeeId = e.target.value;
    $('#exampleTable').show();
    this.getEmployeeAttendanceData(this.employeeId);
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
        alert("Status Updated Successfully");
      });
    this.getEmployeeAttendanceData(this.employeeId);
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
      });
    this.getEmployeeAttendanceData(this.employeeId);
    // console.log("Selected item Id: ", selectedItem.WeekNumber, selectedItem.Year); // You get the Id of the selected item here
  }
  getAllEmployeesList(UserId: any) {
    if (UserId == null) {
      this.timeSheetService.getManagerList()
        .subscribe((response: any) => {
          this.data.push(response);
          console.log(this.data[0]);
          this.Employees = this.data[0];
        });
    }
    else {
      this.timeSheetService.getAllEmployeesForManager(UserId)
        .subscribe((response: any) => {
          this.data.push(response);
          this.Employees = this.data[0];
        });
    }
  }

  getEmployeeAttendanceData(employeeId: string) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5, destroy: true,
    };
    this.Employeeattendacedata = [];
    this.timeSheetService.getEmployeeAttendanceDataByEmployeeID(employeeId)
      .subscribe((response: any) => {
        this.Employeeattendacedata.push(response);
        this.dtTrigger.next(0);
        console.log(this.Employeeattendacedata);
      });
  }
}


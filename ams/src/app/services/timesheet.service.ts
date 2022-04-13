import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common'
import * as internal from 'stream';
import { start } from 'repl';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  currentDateTime: any;
  StartDate: any;
  EndDate: any;
  private url = 'http://10.26.238.161/AttendenceMgmt/';

  constructor(private httpClient: HttpClient, private datepipe: DatePipe) {
    this.currentDateTime = this.datepipe.transform((new Date), 'MM-dd-yyyy');
  }

  getCurrentWeekData() {
    return this.httpClient.get(this.url + this.currentDateTime);
  }


  submit(post: any) {
    return this.httpClient.post(this.url, JSON.stringify(post));
  }
  getGetEmployeeAttendanceSummary(id: string, startDate: string, endDate: string) {     
    this.StartDate = this.datepipe.transform((startDate), 'MM-dd-yyyy');
    this.EndDate = this.datepipe.transform((endDate), 'MM-dd-yyyy');
    //var URL = this.EmployeeSummaryUrl +id + "/" + this.StartDate +"/" + this.EndDate;
    return this.httpClient.get(`${this.url}api/EmployeeAttendance/GetEmployeeAttendanceSummary/${id}/${this.StartDate}/${this.EndDate}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common'
<<<<<<< HEAD
import * as internal from 'stream';
import { start } from 'repl';
=======
import { Employee } from '../addtimesheet/employee.mode';
import { map, catchError } from 'rxjs/operators';
>>>>>>> a49a9fa97e27ba3a2871b3983a81aaf57bc02b3f

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
<<<<<<< HEAD
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
=======
  currentDateTime:any;
  private url = 'http://10.26.238.161/AttendenceMgmt/';

  constructor(private httpClient: HttpClient,private datepipe : DatePipe) {
    this.currentDateTime =this.datepipe.transform((new Date), 'MM-dd-yyyy');
    console.log(this.currentDateTime);
   }

   getEmployeeDeatils(username:string,password:string)
   {
     const params = new HttpParams()
       .set('email', username)
       .set('password', password);
      return this.httpClient.post(`${this.url}api/Employee/GetEmployeByEmailNPassword`, params)
   }

  getCurrentWeekData()
  {
    return this.httpClient.get(`${this.url}api/Calender/GetWeekInfoForSelectedDate/${this.currentDateTime}`);
  }

  submit(post:any){
      return this.httpClient.post(`${this.url}api/EmployeeAttendance/UpdateEmployeeAttendance`, post);
>>>>>>> a49a9fa97e27ba3a2871b3983a81aaf57bc02b3f
  }
}

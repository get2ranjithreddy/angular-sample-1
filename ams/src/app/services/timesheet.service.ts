import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common'
import { Employee } from '../addtimesheet/employee.mode';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
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
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  currentDateTime: any;
  StartDate: any;
  EndDate: any;
  private url = 'http://10.189.129.239/AttendenceMgmt/';

  constructor(private httpClient: HttpClient, private datepipe: DatePipe) {
    this.currentDateTime = this.datepipe.transform((new Date), 'MM-dd-yyyy');
  }
  
  getGetEmployeeAttendanceSummary(id: string, startDate: string, endDate: string) {     
    this.StartDate = this.datepipe.transform((startDate), 'MM-dd-yyyy');
    this.EndDate = this.datepipe.transform((endDate), 'MM-dd-yyyy');
    //var URL = this.EmployeeSummaryUrl +id + "/" + this.StartDate +"/" + this.EndDate;
    return this.httpClient.get(`${this.url}api/EmployeeAttendance/GetEmployeeAttendanceSummary/${id}/${this.StartDate}/${this.EndDate}`);
    
  }
   getEmployeeDeatils(username:string,password:string)
   {
     const params = new HttpParams()
       .set('Email', username)
       .set('Password', password);
      return this.httpClient.post(`${this.url}api/User/GetUserByEmailNPassword`, params)
   }

  getCurrentWeekData(employeeId:string)
  {
    return this.httpClient.get(`${this.url}api/EmployeeAttendance/GetWeekInfoForSelectedDate/${employeeId}/${this.currentDateTime}`);
  }
  submit(post:any){
      return this.httpClient.post(`${this.url}api/EmployeeAttendance/UpdateEmployeeAttendance`, post);
  }

  getAllEmployeesForManager(id: string) {
    const params = new HttpParams()
      .set('id', id)
    return this.httpClient.post(`${this.url}api/User/GetAllEmployeesForAManager`, params)
  }
  getEmployeeAttendanceDataByEmployeeID(id: string) {
    return this.httpClient.get(`${this.url}api/EmployeeAttendance/GetEmployeeAttendanceForApproval/${id}/${this.currentDateTime}`);
  }
  UpdateEmployeeAttendanceStatus(empAttendanceobj : any) {   
      return this.httpClient.get(`${this.url}api/EmployeeAttendance/ApproveOrRejectEmployeeAttendance/${empAttendanceobj.employeeId}/${empAttendanceobj.year}/${empAttendanceobj.weekNumber}/${empAttendanceobj.status}`); 
  }
}

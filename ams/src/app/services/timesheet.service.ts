import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  currentDateTime:any;
  private url = 'http://10.26.238.161/AttendenceMgmt/api/Calender/GetWeekInfoForSelectedDate/';

  constructor(private httpClient: HttpClient,private datepipe : DatePipe) {
    this.currentDateTime =this.datepipe.transform((new Date), 'MM-dd-yyyy');
    console.log(this.currentDateTime);
   }
  
  getCurrentWeekData()
  {
    return this.httpClient.get(this.url + this.currentDateTime);
  }

  submit(post:any){
      return this.httpClient.post(this.url, JSON.stringify(post));
  }
}

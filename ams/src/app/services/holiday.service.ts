import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  private url = 'http://10.189.129.239/AttendenceMgmt/';
  constructor(private httpClient: HttpClient) { }

  getYearsData(year: number) {
    return this.httpClient.get(`${this.url}/api/Calender/GetYearsHolidays/${year}`);
  }

  submit(post:any){
    return this.httpClient.post(`${this.url}api/Calender/UpdateYearEntries`, post);
}

addHolidays(post:any){
  return this.httpClient.post(`${this.url}api/Calender/AddOrUpdateHoliday`, post);
}

deleteHolidays(date:any){
  return this.httpClient.get(`${this.url}api/Calender/DeleteHoliday/${date}`);
}


}

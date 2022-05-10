import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangepasswordService {
  private url = 'http://10.189.129.239/AttendenceMgmt/';
  constructor(private httpClient: HttpClient) { }
  submit(post:any){
    return this.httpClient.post(`${this.url}api/Calender/UpdateYearEntries`, post);
}
}

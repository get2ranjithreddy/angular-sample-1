import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class MonthinfoService {
  private url =
    'http://10.189.129.239/AttendenceMgmt/api/Calender/GetMonthsEntries';

  constructor(private httpClient: HttpClient) {}

  getMonthsData(year: number, month: number) {
    return this.httpClient.get(this.url + '/' + year + '/' + month);
  }
}

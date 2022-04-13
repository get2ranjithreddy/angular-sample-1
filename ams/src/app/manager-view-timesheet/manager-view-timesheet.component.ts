import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
 
@Component({
  selector: 'app-manager-view-timesheet',
  templateUrl: './manager-view-timesheet.component.html',
  styleUrls: ['./manager-view-timesheet.component.css']
})
export class ManagerViewTimesheetComponent implements OnInit {
  timesheetData : any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor()
     { }

  ngOnInit(): void {
   
  }
}

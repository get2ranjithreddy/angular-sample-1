import { DatePipe } from '@angular/common';
import { Component, OnInit, Type } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { TimesheetService } from '../services/timesheet.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor(private timesheetService: TimesheetService, private datepipe: DatePipe) { }

  ngOnInit(): void {
  }
  barChartOptions: ChartOptions = {
    responsive: true,
  };

  showChart: boolean = false;
  showNoDataAvailable:boolean=false;
  barChartLabels: any = [];
  barChartType: any = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  totalWorkingHours: any = [];
  barChartData: ChartDataset[] = [];
  FromDate: Date = new Date();
  ToDate: Date = new Date();
  objTotalHours: any;

  Submit() {
    this.timesheetService.getGetEmployeeAttendanceSummary('1fcb0468-133f-45b0-ab7b-da3fa0340296', this.FromDate.toString(), this.ToDate.toString())
      .subscribe((response: any) => {
        if (response.EmployeeWeekAttendances.length > 0) {
          this.showChart = true;
          this.barChartData = [];
          this.barChartLabels = [];
          this.totalWorkingHours = [];
          for (var i = 0; i < response.EmployeeWeekAttendances.length; i++) {
            let lables = this.datepipe.transform(response.EmployeeWeekAttendances[i].StartDate, 'dd/MM/yyyy')
            this.barChartLabels.push(lables);
            this.totalWorkingHours.push(response.EmployeeWeekAttendances[i].TotalWorkingHours)
            this.objTotalHours = { data: this.totalWorkingHours }
          }

          this.objTotalHours.label = 'Quantity';
          this.barChartData.push(this.objTotalHours);
          console.log(this.barChartLabels);
          console.log(this.barChartData);
        }
        else {
          this.showNoDataAvailable = true;
        }

      });
  }
}

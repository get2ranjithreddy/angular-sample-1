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
  employeeId: string | undefined;

  constructor(private timesheetService: TimesheetService, private datepipe: DatePipe) { }

  ngOnInit(): void {

    this.LoadChart();
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
  
  FromDate: string="";
  ToDate:string="";
  objTotalHours: any;
  showErrorMessage:boolean=false;
  errMessage:string='';

  Submit() {
  
   if(this.FromDate =='')
   {
     this.showErrorMessage=true;
     this.showChart= false;
     this.errMessage="Please select From Date";
   }
   else if (this.ToDate =='')
   {
    this.showErrorMessage=true;
    this.showChart= false;
    this.errMessage="Please select To Date";
   }
   if(this.FromDate !='' && this.ToDate !='')
   {
    this.showChart= true;
     this.showErrorMessage=false;
    this.errMessage ='';
    this.LoadChart();
    }
  }

  LoadChart()
  {
    this.employeeId = localStorage.getItem("Id")?.toString()
    var toDate = this.ToDate.toString()== '' ? this.datepipe.transform(new Date(), 'yyyy-MM-dd'):this.ToDate.toString();
    var fromDate = this.FromDate.toString()==''?this.datepipe.transform(new Date().setDate(new Date().getDate() - 30), 'yyyy-MM-dd'):this.FromDate.toString();  

    this.timesheetService.getGetEmployeeAttendanceSummary(this.employeeId, fromDate?.toString(),toDate?.toString())
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

          this.objTotalHours.label = 'Working Hours';
          this.objTotalHours.backgroundColor='#FF5733';
          this.objTotalHours.hoverBackgroundColor='#FF5733';
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

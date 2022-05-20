import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import { DialogComponent } from '../dialog/dialog.component';
import { HolidayService } from '../services/holiday.service';
import { MonthinfoService } from '../services/monthinfo.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'],
})
export class CalenderComponent implements OnInit {
  dummyDivsCount: number = 0;
  dummyDivs: any = null;
  monthData: any = null;
  staticMonths: any = null;
  staticYears: any = null;
  activeYear: number = 0;
  activeMonth: number = 0;
  requestedMonth: string = '';
  role:string='';
  holidayId: string='';
  holidaysList:any=[];
  isShow=false;
  constructor(private monthinfoService: MonthinfoService,
    public matDialog: MatDialog, public datepipe: DatePipe,
    public holidayService: HolidayService) {}

  ngOnInit(): void {
    this.role = localStorage.getItem("UserRole")!;
    var d = new Date();
    this.activeYear = d.getFullYear();
    this.activeMonth = d.getMonth() + 1;
    this.staticMonths = this.getStaticMonthsList();
    this.staticYears = this.getStaticYearsList(this.activeYear);

    var month = this.getMonthsData(this.activeYear, this.activeMonth);
    this.updateCalender(month);
  }

  loadDefaultData()
  {
    var month = this.getMonthsData(this.activeYear, this.activeMonth);
    this.updateCalender(month);
  }
 
  updateCalender(month: any) {
    if (month != null) {
      month.subscribe((response: any) => {
        this.monthData = response;
        console.log('MonthData', response);
        var firstDay = response[0].Weekday;
        this.dummyDivsCount = this.getDummyDivsCount(firstDay);
        this.dummyDivs = Array(this.dummyDivsCount)
          .fill(0)
          .map((x, i) => i);
        for (var v = 0; v < response.length; v++) {
          response[v].LDay = new Date(Date.parse(response[v].Date)).getDate();
        }
        this.requestedMonth =
          this.getStaticMonthsList()[this.activeMonth - 1] +
          ' ' +
          this.activeYear;
      });
    }
  }

  ngAfterViewChecked(): void {
    (document.getElementById('yearControl') as HTMLInputElement).value =
      this.activeYear.toString();
    (document.getElementById('monthControl') as HTMLInputElement).value =
      this.getStaticMonthsList()[this.activeMonth - 1];
  }

  getDummyDivsCount(weekday: string): number {
    var lWeekday = weekday.toUpperCase();
    switch (lWeekday) {
      case 'SUNDAY':
        return 0;
      case 'MONDAY':
        return 1;
      case 'TUESDAY':
        return 2;
      case 'WEDNESDAY':
        return 3;
      case 'THURSDAY':
        return 4;
      case 'FRIDAY':
        return 5;
      case 'SATURDAY':
        return 6;
    }
    return 0;
  }

  getStaticMonthsList(): any[] {
    return [
      'JANUARY',
      'FEBUARY',
      'MARCH',
      'APRIL',
      'MAY',
      'JUNE',
      'JULY',
      'AUGUST',
      'SEPTEMBER',
      'OCTOBER',
      'NOVEMBER',
      'DECEMBER',
    ];
  }

  getStaticYearsList(today: number): any[] {
    var years = [];
    var lnum = today - 5;
    for (var v = 0; v < 50; v++) {
      years.push(lnum++);
    }
    return years;
  }

  onYearSelectionChange(event: any) {
    this.activeYear = Number.parseInt(
      (document.getElementById('yearControl') as HTMLInputElement).value
    );
    this.holidayService.getYearsData(this.activeYear)
    .subscribe((response: any) => {
      if (response != null) {
        this.holidaysList=[];
        this.isShow=true;
        for(var i=0;i<response.length;i++)
        {
          var date = new Date(response[i].Date).toLocaleDateString('en-us', { year:"numeric", month:"short", day: 'numeric'});;
        
          let obj= {
            Description:response[i].Description,
            Date:date
          }
          this.holidaysList.push(obj);
        }
        
      }
    });
  }

  onMonthSelectionChange(event: any) {
    var selectedMonth = (
      document.getElementById('monthControl') as HTMLInputElement
    ).value;
    this.activeMonth = this.getStaticMonthsList().indexOf(selectedMonth) + 1;
  }

  onSubmitClick(event: any) {
    var month = this.getMonthsData(this.activeYear, this.activeMonth);
    this.updateCalender(month);
  }

  getMonthsData(year: number, month: number): Observable<any> {
    return this.monthinfoService.getMonthsData(year, month);
  }

  openAddDialog(id: number, date: string, description: string): void {

    const dialogRef = this.matDialog.open(DialogComponent, {
      disableClose: true,
      width: '650px',
      height: '290px',
      data: { Id: id, Description: description, Date: this.datepipe.transform(date, 'yyyy-MM-dd') },
    });
    
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }

  openEditDialog(id: number, date: string, description: string): void {
    const dialogRef = this.matDialog.open(DialogComponent, {
      disableClose: true,
      width: '650px',
      height: '290px',
      data: { Id: id, Description: description, Date: this.datepipe.transform(date, 'yyyy-MM-dd') },
    });
    
    dialogRef.afterClosed().subscribe(result => {
    
    });
  }

  openDeleteDialog(id: number, date: string, description: string): void {
    const dialogRef = this.matDialog.open(DeletedialogComponent, 
      {
      disableClose: true,
      width: '450px',
      height: '200px',
      data: { Id: id, Description: description, Date: this.datepipe.transform(date, 'yyyy-MM-dd') },
      position: {
        top: '80px',
        left: '450px'
      }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  onMouseOver(id: string) {

    this.holidayId = id;
  }
}

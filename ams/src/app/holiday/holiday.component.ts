import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { HolidayService } from '../services/holiday.service';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css']
})
export class HolidayComponent implements OnInit {
  staticYears: any = null;
  activeYear: number = 0;
  viewTableShow: boolean = false;
  addTableShow: boolean = false;
  disabledAddTableDate: boolean = true;
  disabledAddTableDescription: boolean = true;
  checkedArry: any = [];
  finalMergedArray: any = [];
  holidayForm: NgForm | undefined;
  viewholidayList: any;
  addHolidayList: any;



  constructor(public fb: FormBuilder, private holidayService: HolidayService, public datepipe: DatePipe) {

  }


  ngOnInit(): void {
    var d = new Date();
    this.activeYear = d.getFullYear();
    this.getStaticYearsList(this.activeYear);

  }



  getStaticYearsList(today: number) {
    var years = [];
    var lnum = today - 2;
    for (var v = 0; v < 6; v++) {
      years.push(lnum++);
    }
    this.staticYears = years;
  }

  onYearChange(val: any) {

    var date = new Date();
    var currentyear = date.getFullYear();
    var year = val.value;
    this.holidayService.getYearsData(year)
      .subscribe((response: any) => {
        if (response != null) {
          if (year <= currentyear) {
            this.viewholidayList = response;
            this.addTableShow = false;
            this.viewTableShow = true;

          } else {
            var length = response.length;
            this.addHolidayList = response;
            this.addHolidayList.forEach(function (element: any) {
              element.IsDateDisabled = true;
              element.IsDescDisabled = true;
              element.Date = element.Date.toString().split('T')[0];
            });
            for (var i = 1; i <= 10 - length; i++) {
              var obj = {
                Date:  this.datepipe.transform((new Date), 'MM-dd-yyyy'),
                Day: '',
                Description: '',
                Id: i,
                IsWorkingDay: '',
                Week: '',
                Weekday: '',
                Year: '',
                IsDateDisabled: true,
                IsDescDisabled: true
              }
              this.addHolidayList.push(obj);

            }
            this.addTableShow = true;
            this.viewTableShow = false;
          }

        }
      });


  }

  onCheckBoxChange(e: any, val: any, Id: any) {

    if (e.target.checked) {
      this.addHolidayList[val].IsDateDisabled = false;
      this.addHolidayList[val].IsDescDisabled = false;
      this.checkedArry.push(this.addHolidayList[val])
    }
    else {
      this.addHolidayList[val].IsDateDisabled = true;
      this.addHolidayList[val].IsDescDisabled = true;
      this.checkedArry.forEach((element: any, index: any) => {
        if (element.Id == Id) {
          this.checkedArry.splice(index, 1);
        }
      });
    }
  }


  onSubmit(form: NgForm) {
    this.finalMergedArray = [];
    this.checkedArry.forEach((element: any, index: any) => {
      var obj = {
        "Id": element.Id,
        "Date": element.Date,
        "Description": element.Description
      }

      this.finalMergedArray.push(obj);
    });
    console.log(this.finalMergedArray);
    // this.holidayService.submit(this.finalMergedArray)
    //   .subscribe((response: any) => {
    //   });
  }

}

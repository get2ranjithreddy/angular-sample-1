import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { HolidayService } from '../services/holiday.service';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';

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

  dbArray: any = [];
  finalMergedArray: any = [];
  holidayForm: NgForm | undefined;
  viewholidayList: any;
  addHolidayList: any;
  submitted: any = false;
  selectedYear: any;
  errMessage: string = '';
  showErrorMessage: boolean = false;
  isChecked: boolean = false;
  checkedArry: any;


  constructor(public fb: FormBuilder, private holidayService: HolidayService, public datepipe: DatePipe,
    private router: Router) {

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

    this.showErrorMessage = false;
    var date = new Date();
    var currentyear = date.getFullYear();
    var year = val.value;
    this.selectedYear = year;
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

            this.addHolidayList.forEach((element: any, index: any) => {
              element.IsExisting = true;
              element.IsChecked = true;
              element.Date = element.Date.toString().split('T')[0];
              element.minYear = val.value + "-" + "01" + '-' + "01";
              element.maxYear = val.value + "-" + "12" + '-' + "31";
              element.rowNumber = index + 1;
            });

            for (var i = 1; i <= 10 - length; i++) {

              var obj = {
                Date: val.value + "-" + "01" + '-' + "01",
                Day: '',
                Description: '',
                Id: i,
                IsWorkingDay: '',
                Week: '',
                Weekday: '',
                Year: '',
                IsChecked: false,
                minYear: val.value + "-" + "01" + '-' + "01",
                maxYear: val.value + "-" + "12" + '-' + "31",
                rowNumber: length + i
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
      this.addHolidayList[val].IsChecked = true;

    }
    else {
      this.addHolidayList[val].IsChecked = false;

    }
  }

  onDescriptionChange(e: any, val: any) {
    if (e) {
      const isDescriptionExists = this.DescriptionExists(this.addHolidayList[val].Description, this.addHolidayList[val].Id);
      if (isDescriptionExists) {
        this.addHolidayList[val].Description = '';
        this.showErrorMessage = true;
        this.errMessage = "Please give valid Description";
      }
      else {
        this.showErrorMessage = false;
        this.errMessage = '';
      }
    }
  }

  onDateChange(e: any, val: any) {
    if (e) {
      const weekend = this.isWeekend(new Date(this.addHolidayList[val].Date))
      if (!weekend) {
        const isDateExists = this.DateExists(this.addHolidayList[val].Date, this.addHolidayList[val].Id);
        if (isDateExists) {
          this.addHolidayList[val].Date = this.selectedYear + "-" + "01" + '-' + "01";
          this.showErrorMessage = true;
          this.errMessage = "Please select valid Date";
        }
        else {
          this.showErrorMessage = false;
          this.errMessage = '';
        }
      }
      else {
        this.addHolidayList[val].Date = this.selectedYear + "-" + "01" + '-' + "01";
        alert('Weekend are not allowed');
      }
    }
  }

  DescriptionExists = (name: string, Id: string) => {
    return this.addHolidayList.some(function (el: { Description: string; Id: string; IsChecked: boolean }) {
      return el.Description == name && el.Id != Id && el.IsChecked == true;
    });
  }

  DateExists = (date: string, Id: string) => {
    return this.addHolidayList.some(function (el: { Date: string; Id: string; IsChecked: boolean }) {
      return el.Date == date && el.Id != Id && el.IsChecked == true;
    });
  }

  isWeekend = (date: any) => {
    return date.getDay() === 6 || date.getDay() === 0;
  }

  onSubmit(form: NgForm) {
    this.showErrorMessage = false;
    this.finalMergedArray = [];
    this.errMessage = '';
    let datecount = 0;
    let descriptioncount = 0;
    let totalcount = 0;
    let message = "";
    let isCheckedCount = 0;
    this.addHolidayList.forEach((element: any, index: any) => {
      if (element.IsChecked) {
        message = '';
        isCheckedCount++;
        //this.showErrorMessage = false;
        const isDateExists = this.DateExists(element.Date, element.Id);
        const isDescriptionExists = this.DescriptionExists(element.Description, element.Id);

        if (element.Description == "") {
          
          this.showErrorMessage = true;
          message = 'Invalid Description in Row ' + element.rowNumber + '';
        }
        if (element.Description != "" && isDateExists) {
          message = 'Invalid Date in Row ' + element.rowNumber + ',' + element.Date + ' \nDate already exists.<br>';
          datecount++;
        }
        if (element.Description != "" && isDescriptionExists) {
          message = 'Invalid Description in Row ' + element.rowNumber + ',' + element.Description + ' Description already exists.<br>';
          descriptioncount++;
        }

        if (isDateExists && isDescriptionExists) {
          message = 'Invalid Date and Description in Row ' + element.rowNumber + ' <br>';
        }
        var errorMessage = message.split("<br>");
        if(this.errMessage.includes('Please select atleast one checkbox'))
        {
          this.errMessage='';
          this.errMessage += errorMessage;
        }
        else{
          this.errMessage += errorMessage;
        }
       
        totalcount = datecount + descriptioncount;
        if (element.Description != "" && totalcount == 0) {
          var obj = {
            "IsWorkingDay": element.IsWorkingDay,
            "Date": new Date(element.Date),
            "Description": element.Description
          }
          this.finalMergedArray.push(obj);
        }
        else if (totalcount > 0) {
          this.showErrorMessage = true;
        }
      }
      else {
        if (isCheckedCount == 0) {
          this.showErrorMessage = true;
          this.errMessage = "Please select atleast one checkbox";
        }

      }
    });
    // alert(JSON.stringify(this.finalMergedArray));
    // console.log(this.finalMergedArray);
    if (this.finalMergedArray.length > 0) {
      this.holidayService.submit(this.finalMergedArray)
        .subscribe((response: any) => {
          if(response == true)
          {
          alert('Holidays updated sucessfully');
          this.router.navigate(['/holiday']);
          }
        });
    }
  }

}



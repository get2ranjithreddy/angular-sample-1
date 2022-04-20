import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { userTimesheet } from '../app.model';
import { TimesheetService } from '../services/timesheet.service';
import { Router } from '@angular/router';
import { Timesheet } from './timesheet.model';
import { Employee } from './employee.mode';

@Component({
  selector: 'app-addtimesheet',
  templateUrl: './addtimesheet.component.html',
  styleUrls: ['./addtimesheet.component.css']
})
export class AddtimesheetComponent implements  OnInit {
  timesheetData:any= new userTimesheet();
  timesheetForm: FormGroup = new FormGroup({});
  employee=new Employee();
  weekData:any=[];
  options: string[];
  arryEmployeeDayAttendanceEntries:any=[];
  IsDisabled:boolean=true;
  employeeId:string="";
  constructor(
    public fb: FormBuilder,
    private timeSheetService:TimesheetService,
    private router: Router,
    private datepipe : DatePipe
    ) {
      this.timesheetForm = this.fb.group({
        Sunday: [''],
        Monday: ['',[Validators.required]],
        Tuesday: ['',[Validators.required]],
        Wednesday: ['',[Validators.required]],
        Thursday: ['',[Validators.required]],
        Friday: ['',[Validators.required]],
        Saturday: ['',[Validators.required]],
        total: ['',[Validators.required]]
      });
    this.options = [
      "Leave",
      "4 hrs",
      "8 hrs"

    ];
  
  }


  ngOnInit(): void {
    this.getEmployeeDeatils();
    this.getCurrentWeekData();
    
    }



  // timesheetForm = new FormGroup({
  //   monday: new FormControl('',[Validators.required ,Validators.pattern("^[0-9]*$")]),
  //   tuesday: new FormControl('',[Validators.required]),
  //   wednesday: new FormControl('',[Validators.required]),
  //   thursday: new FormControl('',[Validators.required]),
  //   friday: new FormControl('',[Validators.required]),
  //   total:new FormControl('')
  // });

  get f(){
    return this.timesheetForm.controls;
  }

  onChange(event: any){
    
     let mondayValue= this.timesheetForm.controls["Monday"].value == '4 hrs' ? 4: this.timesheetForm.controls["Monday"].value == '8 hrs' ? 8 : 0;
     let tuesdayValue= this.timesheetForm.controls["Tuesday"].value == '4 hrs' ? 4: this.timesheetForm.controls["Tuesday"].value == '8 hrs' ? 8 : 0;
     let wednesdayValue= this.timesheetForm.controls["Wednesday"].value == '4 hrs' ? 4: this.timesheetForm.controls["Wednesday"].value == '8 hrs' ? 8 : 0;
     let thursdayValue= this.timesheetForm.controls["Thursday"].value == '4 hrs' ? 4: this.timesheetForm.controls["Thursday"].value == '8 hrs' ? 8 : 0;
     let fridayValue= this.timesheetForm.controls["Friday"].value == '4 hrs' ? 4: this.timesheetForm.controls["Friday"].value == '8 hrs' ? 8 : 0;
     let saturdayValue= this.timesheetForm.controls["Saturday"].value == '4 hrs' ? 4: this.timesheetForm.controls["Saturday"].value == '8 hrs' ? 8 : 0;
     let sundayValue= this.timesheetForm.controls["Sunday"].value == '4 hrs' ? 4: this.timesheetForm.controls["Sunday"].value == '8 hrs' ? 8 : 0;
     let total= mondayValue + tuesdayValue + wednesdayValue + thursdayValue + fridayValue + saturdayValue + sundayValue;
     this.timesheetForm.controls["total"].setValue(total);
  }

  getEmployeeDeatils()
  {
    let username= "DudleyMacejkovic_Bernhard@gmail.com";
    let password = "quoieauuie";
    this.timeSheetService.getEmployeeDeatils(username,password)
    .subscribe((response:any) => {
      if(response != null)
      {

      this.employee.Id = response.Id;
      this.employee.Name = response.Name;
      this.employee.Email = response.Email;
      console.log(this.employee);
      }
     
    });
  }

  getCurrentWeekData() {
    this.employeeId = "8701b3ab-2d69-4d84-a437-e9ef6157ecc1";
    this.timeSheetService.getCurrentWeekData(this.employeeId)
      .subscribe((response:any) => {
       console.log("WeekData",response);
        this.weekData.push(response);
        for (var i = 0; i < this.weekData[0].length; i++) {
          if(this.weekData[0][i].IsWorkingDay)
          {
            this.timesheetForm.controls[this.weekData[0][i].Weekday].setValidators([Validators.required]);
            this.timesheetForm.updateValueAndValidity();
          }
          if (this.weekData[0][i].Weekday == 'Sunday' || this.weekData[0][i].Weekday == 'Saturday') {
            this.timesheetForm.get('Sunday')?.disable();
            this.timesheetForm.get('Saturday')?.disable();
          }
        }
      });
  }

  onSubmit() {

    this.timesheetData = this.timesheetForm.value;
    var timesheet = new Timesheet();
    
    for (var i = 0; i < this.weekData[0].length; i++) {
      let date = this.datepipe.transform(this.weekData[0][i].Date, 'MM-dd-yyyy')
      var objEmployeeDayAttendanceEntries =
      {
        Date: date,
        IsWorkingDay: this.weekData[0][i].IsWorkingDay,
        WorkingHours: this.timesheetForm.controls[this.weekData[0][i].Weekday].value == '4 hrs' ? 4: this.timesheetForm.controls[this.weekData[0][i].Weekday].value == '8 hrs' ? 8 :0
      };
      this.arryEmployeeDayAttendanceEntries.push(objEmployeeDayAttendanceEntries);

    }
   
    timesheet.EmployeeId = this.employee.Id;
    timesheet.WeekAttendance = this.arryEmployeeDayAttendanceEntries;
    console.log(JSON.stringify(timesheet));
    alert(JSON.stringify(timesheet));
    this.timeSheetService.submit(timesheet)
      .subscribe((response:any) => {
        alert(response)
        this.timesheetForm.reset();
        alert("Timesheet Added Sucessfully");
        this.router.navigate(['/addTimeSheet']);
      
      });
  }

  cancel()
  {
    this.timesheetForm.reset();
    this.router.navigate(['/addTimeSheet']);
  }
}



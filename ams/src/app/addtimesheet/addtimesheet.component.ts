import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { userTimesheet } from '../app.model';
import { TimesheetService } from '../services/timesheet.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addtimesheet',
  templateUrl: './addtimesheet.component.html',
  styleUrls: ['./addtimesheet.component.css']
})
export class AddtimesheetComponent implements OnInit {
  timesheetData:any= new userTimesheet();
  timesheetForm: FormGroup = new FormGroup({});
  weekData:any=[];
  options: string[];
  constructor(
    private fb: FormBuilder,
    private timeSheetService:TimesheetService,
    private router: Router
    ) {
      this.timesheetForm = fb.group({
      Sunday: [''],
      Monday: ['', [Validators.required]],
      Tuesday: ['', [Validators.required]],
      Wednesday: ['', [Validators.required]],
      Thursday: ['', [Validators.required]],
      Friday: ['', [Validators.required]],
      Saturday: [''],
      total: ['']
    });
    this.options = [
      "Leave",
      "4 hrs",
      "8 hrs"
      
    ];
     }

  ngOnInit(): void {
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

  getCurrentWeekData() {
    this.timeSheetService.getCurrentWeekData()
      .subscribe((response:any) => {
       console.log("WeekData",response);
        this.weekData.push(response);
        for (var i = 0; i < this.weekData.length; i++) {
          if (this.weekData[0][i].Weekday == 'Sunday' || this.weekData[0][i].Weekday == 'Saturday') {
            this.timesheetForm.get('Sunday')?.disable();
            this.timesheetForm.get('Saturday')?.disable();
          }
        }
      });
  }

  onSubmit() {
    this.timesheetData = this.timesheetForm.value;
    alert(JSON.stringify(this.timesheetData));
    this.timeSheetService.submit(JSON.stringify(this.timesheetData))
      .subscribe((response:any) => {
        alert("Timesheet Added Sucessfully")
      });
  }

  cancel()
  {
    this.router.navigateByUrl('addTimeSheet');
  }
}



import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HolidayService } from '../services/holiday.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  description: string | undefined;
  submitted: boolean = false;
  // @Input() calenderApi: CalenderComponent | undefined;
  // @Output() myEvent =new EventEmitter();
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DialogComponent>, private holidayService: HolidayService,
    @Inject(MAT_DIALOG_DATA) public data: any, public datepipe: DatePipe) { }

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.submitted = true;
    if (this.data.Description != null) {
      let objHoliday = {
        "Date": this.datepipe.transform(this.data.Date, 'MM-dd-yyyy'),
        "Description": this.data.Description
      }
      this.holidayService.addHolidays(objHoliday)
        .subscribe((response: any) => {
          alert('Holidays Added sucessfully');
          this.dialogRef.close(this.data);
          //this.myEvent.emit();
         // this.calenderApi.loadDefaultData();
        });
    }

  }

  }

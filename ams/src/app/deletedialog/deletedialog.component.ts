import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HolidayService } from '../services/holiday.service';

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.css']
})
export class DeletedialogComponent implements OnInit {
  submitted: boolean = false;

  constructor(public dialogRef: MatDialogRef<DeletedialogComponent>, private holidayService: HolidayService,
    @Inject(MAT_DIALOG_DATA) public data: any, public datepipe: DatePipe) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.submitted = true;
    if (this.data.Description != null) {
      let date = this.datepipe.transform(this.data.Date, 'MM-dd-yyyy');
      this.holidayService.deleteHolidays(date)
        .subscribe((response: any) => {
          alert('Holiday deleted sucessfully');
          this.dialogRef.close(this.data);
        });
    }
  }
}

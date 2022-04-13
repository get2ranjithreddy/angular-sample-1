import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerViewTimesheetComponent } from './manager-view-timesheet.component';

describe('ManagerViewTimesheetComponent', () => {
  let component: ManagerViewTimesheetComponent;
  let fixture: ComponentFixture<ManagerViewTimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerViewTimesheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerViewTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

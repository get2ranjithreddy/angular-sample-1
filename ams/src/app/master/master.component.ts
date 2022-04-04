import { Component, OnInit } from '@angular/core';
import { Login } from '../app.model';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
LoginModel:Login= new Login();

  constructor() { }

  ngOnInit(): void {
  }

}

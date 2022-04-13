import { Boss } from "./Boss.Model";

export class Employee{
    Id:number= 0;
    Name:string="";
    Gender:string="";
    Email:string="";
    Password:string="";
    Boss :any = new Boss(); 
}
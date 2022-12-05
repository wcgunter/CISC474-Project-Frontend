import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  totalHoursWorked = 0;
  employees: any = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.apiService.getEmployees().then((employees) => {
      if(employees){
        console.log(employees);
        this.employees = Object.values(employees);
        console.log(this.employees);
      }
    })
  }

  calculateTotalPay(employeeList: any): number {

    if(!employeeList) {
      return -1;
    }

    return 0;

  }

  getEmployeeWage(employee: any): number {

    if(!employee.jobs) {
      return 0;
    }

    if(!employee.jobs[employee.jobs.length - 1].pay_rate) {
      return 0
    }

    let payrate = employee.jobs[employee.jobs.length - 1].pay_rate;
    return(payrate);

  }

  getEmployeeWageString(employee: any): string {
    
    let wage: number = this.getEmployeeWage(employee);
    
    if(wage === -1) {
      return "Unavailable";
    } else {
      return "$" + wage.toString() + "/hr";
    }
  }

  getClockedInStatus(employee: any): string {

    if(!employee.logs) {
      return "Unavailable"
    }

    if(employee.logs[employee.logs.length - 1].clock_out_date_time) {
      return "Clocked Out";
    } else {
      return "Clocked In";
    }


  }

  //Return the number of hours worked by an employee
  getEmployeeHours(employee: any): number {

    if(employee) {

      let counter: number = 0;
      let hours: number = 0;

      if (employee.logs) {

        while(counter < employee.logs.length) {

          if(employee.logs[counter].clock_in_date_time && employee.logs[counter].clock_out_date_time) {
  
            let clockInDate: string = employee.logs[counter].clock_in_date_time;
            let clockOutDate: string = employee.logs[counter].clock_out_date_time;

            let seconds: number = ((Number(new Date(clockOutDate)) - Number(new Date(clockInDate))) / 1000);
            let minutes: number = seconds / 60;
            hours += Math.round(((minutes / 60)) * 100) / 100;
            
          }
  
          counter++;
        
        }

      }

      return hours;

    } else {

      return 0;

    }

  }

  getTotalStaffHours(): number {
    
    let index: number = 0;
    let total_hours: number = 0;

    while (index < this.employees.length) {

      total_hours += this.getEmployeeHours(this.employees[index]);
      index++;

    }
    
    return total_hours;
  }

  getTotalStaffSize(): number {

    return this.employees.length;

  }

  getEmployeePay(employee: any): number {

    let unrounded_pay: number = this.getEmployeeHours(employee) * this.getEmployeeWage(employee); 
    return Number((Math.round(unrounded_pay * 100) / 100).toFixed(2));

  }

  getTotalStaffPay(): number {

    let index: number = 0;
    let total_pay: number = 0;

    while (index < this.employees.length) {

      total_pay += this.getEmployeePay(this.employees[index]);
      index++;

    }

    return total_pay;

  }

  getLastClockInEvent(employee: any): Date | string {

    let lastInEvent: string = "Unavailable";
    let index: number = 0;

    if(employee.logs) {

      while(index < employee.logs.length) {

        if(employee.logs[index].clock_in_date_time) {
          lastInEvent = employee.logs[index].clock_in_date_time;
        }
  
        index++;
  
      }

    }

    if(lastInEvent === "Unavailable") {
      
      return "Unavailable";
    
    } else {
      
      return new Date(lastInEvent);
    
    }

  }

  getLastClockOutEvent(employee: any): Date | string {

    let lastOutEvent: string = "Unavailable";
    let index: number = 0;

    if(employee.logs) {

      while(index < employee.logs.length) {

        if(employee.logs[index].clock_out_date_time) {
          lastOutEvent = employee.logs[index].clock_out_date_time;
        }
  
        index++;
  
      }

    }

    if(lastOutEvent === "Unavailable") {
      
      return "Unavailable";
    
    } else {
      
      return new Date(lastOutEvent);
    
    }

  }

}

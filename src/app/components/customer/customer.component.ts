import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers:Customer[]=[];
  user:User;

  constructor(private customerService:CustomerService,
    private userService:UserService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe(response=>{
      this.customers = response.data;
    });
  }

  getUser(email:string){
    this.userService.getUserByEmail(email).subscribe(response=>{
      this.user = response.data;
    });
  }

}

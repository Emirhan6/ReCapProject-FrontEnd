import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { RentalService } from 'src/app/services/rental.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer.service';
import { CreditCard } from 'src/app/models/creditCard';
import { Customer } from 'src/app/models/customer';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css']
})
export class RentalAddComponent implements OnInit {
  rentalAddForm: FormGroup;
  customers: Customer[];
  creditCards: CreditCard[];
  creditCardId: number;
  control: boolean = false;
  currentUserId: number;
  carId: number;
  customerId: number;

  constructor(
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private customerService: CustomerService,
    private creditCardService: CreditCardService,
    private userService: UserService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createRentAddForm();
    // this.getCustomers();
    // this.getCurrentUser();
    // this.activatedRoute.params.subscribe((params) => {
    //   if (params['carId']) {
    //     this.carId = parseInt(params['carId']);
    //     this.createRentAddForm();
    //   }
    // });
  }

  createRentAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      carId: ['', Validators.required],
      customerId: ['', Validators.required],
      returnDate: ['', Validators.required],
      rentDate: ['', Validators.required],
    });
  }

  rent() {
    if (this.rentalAddForm.valid) {
      let rentModel = Object.assign({}, this.rentalAddForm.value)
      this.rentalService.add(rentModel).subscribe(response => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message);
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat!');
    }
  }

  // getCustomers() {
  //   this.customerService.getCustomers().subscribe((response) => {
  //     this.customers = response.data;
  //   });
  // }

  // getCustomerById(id:number) {
  //   this.customerService.getCustomersById(id).subscribe(response=>{
  //     this.customers = response.data
  //   })
  // }

  // getRentMinDate() {
  //   var today = new Date();
  //   today.setDate(today.getDate() + 1);
  //   return today.toISOString().slice(0, 10);
  // }
  // getReturnMinDate() {
  //   var today = new Date();
  //   today.setDate(today.getDate() + 2);
  //   return today.toISOString().slice(0, 10);
  // }

  // getCreditCardByUserId(currentUserId: number) {
  //   this.creditCardService
  //     .getAllByUserId(currentUserId)
  //     .subscribe((response) => {
  //       this.creditCards = response.data;
  //       if (this.creditCards.length > 0) {
  //         this.control = true;
  //       }
  //     });
  // }

  // getCurrentUser() {
  //   this.userService
  //     .getUserByEmail(this.authService.getEmail())
  //     .subscribe((response) => {
  //       this.currentUserId = response.data.userId;
  //       this.getCreditCardByUserId(this.currentUserId);
  //     });
  // }
  
}

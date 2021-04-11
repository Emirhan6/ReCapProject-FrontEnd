import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-credit-card-add',
  templateUrl: './credit-card-add.component.html',
  styleUrls: ['./credit-card-add.component.css']
})
export class CreditCardAddComponent implements OnInit {

  creditCardAddForm:FormGroup
  currentUserId: number;

  constructor(private formBuilder:FormBuilder,
    private userService:UserService,
    private authService:AuthService,
    private creditCardService:CreditCardService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createCreditCardAddForm();
    this.getCurrentUser();
  }

  createCreditCardAddForm(){
    this.creditCardAddForm = this.formBuilder.group({
      userId:[this.currentUserId,Validators.required],
      cardNumber:["",Validators.required],
      fullName:["",Validators.required],
    })
  }

  getCurrentUser() {
    this.userService
      .getUserByEmail(this.authService.getEmail())
      .subscribe((response) => {
        this.currentUserId = response.data.userId;
        this.createCreditCardAddForm();
      });
  }

  add() {
    if (this.creditCardAddForm.valid) {
      let creditCardModel = Object.assign({}, this.creditCardAddForm.value);
      this.creditCardService.add(creditCardModel).subscribe((response) => {
        this.toastrService.success("Kredi Kartı Eklendi", 'Başarılı!');
      });
    }
  }

}

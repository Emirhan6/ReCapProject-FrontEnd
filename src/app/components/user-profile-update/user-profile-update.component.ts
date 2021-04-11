import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.css']
})
export class UserProfileUpdateComponent implements OnInit {

  profileUpdateForm:FormGroup;
  user:User;
  userId:number;
  firstName:string;
  lastName:string;
  email:string;
  passwordHash: Byte[];
  passwordSalt: Byte[];
  status:boolean;


  constructor(private userService:UserService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.createProfileUpdateForm();
    this.activatedRoute.params.subscribe((params) => {
      if (params['userId']) {
        this.getUserById(params['userId']);
      }
    });
  }

  createProfileUpdateForm(){
    this.profileUpdateForm = this.formBuilder.group({
      userId:[this.userId,Validators.required],
      firstName:[this.firstName,Validators.required],
      lastName:[this.lastName,Validators.required],
      email:[this.email,Validators.required],
      passwordHash:[this.passwordHash,Validators.required],
      passwordSalt:[this.passwordSalt,Validators.required],
      status:[this.status,Validators.required]
    });
  }


  getUserById(userId: number) {
    this.userService.getUserById(userId).subscribe((response) => {
      this.user = response.data;
      this.userId = this.user.userId;
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.email = this.user.email;
      this.passwordHash = this.user.passwordHash;
      this.passwordSalt = this.user.passwordSalt;
      this.status = this.user.status;
      this.createProfileUpdateForm();
    });
  }

  update() {
    if (this.profileUpdateForm.valid) {
      let userModel = Object.assign({}, this.profileUpdateForm.value);
      this.userService.update(userModel).subscribe((response) => {
        this.toastrService.success(response.message, 'Success');
      });
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

}

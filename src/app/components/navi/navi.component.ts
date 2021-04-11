import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  
  fullName: string;
  userId: number;

  constructor(private authService:AuthService,
    private userService:UserService) { }

  ngOnInit(): void {
    if (this.authenticationControl()==true) {
      this.fullName = this.getFullName();
      this.getUser();
    }
  }

  getFullName(): string {
    return localStorage.getItem('fullName');
  }

  getUser(): number {
    this.userService.getUsers().subscribe((response) => {
      response.data.forEach((user) => {
        if (user.email == this.getFullName()) {
          this.userId = user.userId;
        }
      });
    });
    return this.userId;
  }

  logout() {
    this.authService.logout();
  }

  authenticationControl(){
    return this.authService.isAuthenticated();
  }
}

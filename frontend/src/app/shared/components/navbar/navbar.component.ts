import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../modules/auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  role: string = "";
  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    console.log(this.authService.role);
    this.role = this.authService.role.value;
    this.authService.role.subscribe(
      (role) => {
        console.log(role);
        this.role = role;
      }
    );
  }

}

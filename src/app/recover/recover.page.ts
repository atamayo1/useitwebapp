import { Component, OnInit } from '@angular/core';
import {User} from "../shared/user.class";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {
  user: User = new User();
  constructor(private authServc: AuthService, private router: Router) { }

  ngOnInit() {
  }

   onRecover(){
    this.authServc.onForgotPassword(this.user.email);
      this.router.navigateByUrl('/login');
  }
}

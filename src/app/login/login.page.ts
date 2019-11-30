import {Component, NgZone, OnInit} from '@angular/core';
import {User} from "../shared/user.class";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = new User();
  constructor(private authServc: AuthService, private router: Router, public ngZone: NgZone) { }

  ngOnInit() {
  }
   async onLogin(){
    const user = await this.authServc.onLogin(this.user);
    if(user){
      console.log('Successfully login user!');
      this.router.navigateByUrl('/home');
    }
  }

}

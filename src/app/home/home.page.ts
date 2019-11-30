import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {Event} from "../models/event";
import {EventService} from "../services/event.service";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
    events: Event[];
  constructor(private authServ: AuthService, private eventServ: EventService, private router: Router) {
  }

  ngOnInit(){
      this.eventServ.getEvents().subscribe(res => this.events = res);
  }

  onRemove(idEvent: string){
      this.eventServ.removeEvent(idEvent);
  }
  offState(state){
  }

    onLogout(){
  return this.authServ.onLogout().then(() => {
          this.router.navigateByUrl('/login');
      })
  }
}

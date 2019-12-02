import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event';
import { EventService } from '../services/event.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {

  event: Event = {
    name: '',
    description: '',
    userid: '',
    fecha: '',
    state: '',
  };

  eventId= null;

  constructor(private route: ActivatedRoute, private nav: NavController, private eventService: EventService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.params['id'];
    if (this.eventId){
      this.loadEvent();
    }
  }

  async loadEvent(){
    const loading = await this.loadingController.create({
      message: 'Loading....'
    });
    await loading.present();

    this.eventService.getEvent(this.eventId).subscribe(event => {
      loading.dismiss();
      this.event = event;
    });
  }

  async saveEvent() {
    const loading = await this.loadingController.create({
      message: 'Saving....'
    });
    await loading.present();

    if (this.eventId) {
      this.eventService.updateEvent(this.event, this.eventId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/home');
      });
    } else {
      this.eventService.addEvent(this.event).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/home');
      });
    }
  }
}

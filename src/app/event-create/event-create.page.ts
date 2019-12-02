import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event';
import { EventService } from '../services/event.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.page.html',
  styleUrls: ['./event-create.page.scss'],
})
export class EventCreatePage implements OnInit {
  event: Event = {
    name: '',
    description: '',
    userid: '',
    fecha: '',
    state: '',
  };

  constructor(private route: ActivatedRoute, private nav: NavController, private eventService: EventService, private loadingController: LoadingController) { }

  ngOnInit() {
  }

  async saveEvent() {
    const loading = await this.loadingController.create({
      message: 'Saving....'
    });
    await loading.present();

      this.eventService.addEvent(this.event).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/home');
      });

  }

}

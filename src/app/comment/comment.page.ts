import { Component, OnInit } from '@angular/core';
import {Event} from "../models/event";
import {Comment} from "../models/comment";
import {ActivatedRoute} from "@angular/router";
import {LoadingController, NavController} from "@ionic/angular";
import {EventService} from "../services/event.service";
import {CommentService} from "../services/comment.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {

  event: Event = {
    name: '',
    description: '',
    userid: '',
    fecha: '',
    state: '',
  };

  comment: Comment = {
    name: '',
    description: '',
    userid: '',
  };

  comments: Comment[];

  eventId= null;

  constructor(private route: ActivatedRoute, private commentService: CommentService, private nav: NavController, private eventService: EventService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.params['id'];
    if (this.eventId){
      this.loadEvent();
    }

      this.commentService.getComments().subscribe(res => this.comments = res);

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

  async saveComment() {
    const loading = await this.loadingController.create({
      message: 'Saving....'
    });
    await loading.present();

      this.commentService.addComment(this.comment).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/home');
      });
  }
}

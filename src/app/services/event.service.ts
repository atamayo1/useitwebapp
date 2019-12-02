import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventsCollection: AngularFirestoreCollection<Event>;
  private events: Observable<Event[]>;

  constructor(db:AngularFirestore) {
    this.eventsCollection = db.collection<Event>('eventos');
    this.events = this.eventsCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
          });
        })
    );
  }

  getEvents(){
    return this.events;
  }

  getEvent(id: string){
    return this.eventsCollection.doc<Event>(id).valueChanges();
  }

  updateEvent(event:Event, id: string){
    return this.eventsCollection.doc(id).update(event);
  }

  addEvent(event: Event){
    return this.eventsCollection.add(event);
  }

  removeEvent(id: string){
    return this.eventsCollection.doc(id).delete();
  }

}

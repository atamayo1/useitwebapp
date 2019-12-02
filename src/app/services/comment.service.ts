import { Injectable } from '@angular/core';
import {Comment} from "../models/comment";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentsCollection: AngularFirestoreCollection<Comment>;
  private comments: Observable<Comment[]>;

  constructor(db:AngularFirestore) {
    this.commentsCollection = db.collection<Comment>('comments');
    this.comments = this.commentsCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
          });
        })
    );
  }

  getComments(){
    return this.comments;
  }


  addComment(comment: Comment){
    return this.commentsCollection.add(comment);
  }
}

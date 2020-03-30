import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'src/app/domain/giflo_db/user';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  itemDoc: AngularFirestoreDocument<User>;
  constructor(private session: SessionService) {
    this.user = session.currentUser;
  }

  ngOnInit() {
  }

}

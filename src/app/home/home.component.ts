import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  response;
  userProfile;
  loggedIn;

  constructor(private data: DataService, private userService: UserService) {
    this.data.loggedIn.subscribe(loggedIn => this.loggedIn = loggedIn);
   }

  ngOnInit() {
    this.userProfile = this.userService.getUserProfile().subscribe((res) => {
      this.userProfile = res;
      console.log('this.userProfile', this.userProfile);
    });
  }

  logout() {
    this.data.editLoggedIn(false);
    this.userService.removeTokens();
  }

}

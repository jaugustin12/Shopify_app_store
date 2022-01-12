import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSuccessMessage: boolean;
  serverErrorMessages: string;
  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.userService.postUser(this.userService.selectedUser).subscribe(
      res => {
        console.log('this.userService.selectedUser', this.userService.selectedUser)
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        } else {
          this.serverErrorMessages = 'Something went wrong';
        }
      }
    );
  }
  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      role: 'user',
      fullName: '',
      email: '',
      password: '',
      relationships: {
        followers: [],
        following: []
      },
      posts: {
        userPosts: []
      }
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model = {
    email: '',
    password: ''
  };

  // MatPaginator Output
  pageEvent: PageEvent;

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
    onSubmit(form: NgForm) {
      this.userService.login(form.value).subscribe(
        res => {
          this.router.navigateByUrl('');
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
}

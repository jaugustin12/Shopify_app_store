import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { App } from '../../models/app.model';
import { Review } from '../../models/review.model';
import { map } from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import { NgForm } from '@angular/forms';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { resolve } from 'url';

interface IData {
  message: string
}

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css']
})

export class AppsComponent implements OnInit, OnDestroy {
  post = "";
  app;
  toggleInfo = false;
  toggleForm = false;
  dtOptions: DataTables.Settings = {};
  apps: App[] = [];
  content = "app";
  reviews: Review[] =[];
  userProfile;
  options: FormGroup;
  serverErrorMessages;
  rating = 3;
  body = '';
  review;
  reviewform = new FormGroup({
    'rating': new FormControl(this.rating, [Validators.min(1), Validators.max(5)]),
    'text':  new FormControl(this.body)
  })
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True'})};
  // @Input() reviews: Review[] = [];
  // @Output() sizeChange = new EventEmitter<Review[]>();

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient, private userService: UserService, fb: FormBuilder) {
   }

   delete(review) {
    let id = review._id
    console.log('id', id)
    this.httpClient.post('http://localhost:3000/api/deleteReview', {'id' : id},  this.noAuthHeader)
    .subscribe((data: IData) => {
      this.serverErrorMessages = data.message;
      const index = this.reviews.indexOf(review);
      console.log('index',index);
      if (index > -1) {
        this.reviews.splice(index, 1);
        console.log('this.reviews', this.reviews)
      }
    }, err => {
          if (err.status === 422) {
            this.serverErrorMessages = err.error.join('<br/>');
          }else {
            console.log('err', err)
              this.serverErrorMessages = err;
           }
    });
   }

   update(review) {
     this.post = "update"
     this.review = review;
     this.reviewform = new FormGroup({
      'rating': new FormControl(review.rating, [Validators.min(1), Validators.max(5)]),
      'text':  new FormControl(review.body)
    })
    this.toggleInfo = false;
    this.toggleForm = true;
   }

   async onSubmit(form: NgForm, review?) {
     if (this.post == "add") {
      this.httpClient.post('http://localhost:3000/api/addReview', {'form' : form.value, 'profile': this.userProfile.user, 'app': this.app},  this.noAuthHeader)
      .subscribe((data: IData) => {
        this.serverErrorMessages = data.message;
      }, err => {
            if (err.status === 422) {
              this.serverErrorMessages = err.error.join('<br/>');
            }else {
              console.log('err', err)
                this.serverErrorMessages = err;
             }
      });
      await this.timeout(3000)
      this.toggleInfo = false;
      this.toggleForm = false;
      console.log('this.toggleForm', this.toggleForm)
     }
     if (this.post == "update") {
      console.log('this.review', this.review)
      console.log('this.review._id', this.review._id)
      this.httpClient.post('http://localhost:3000/api/updateReview', {'form' : form.value, 'id': this.review._id},  this.noAuthHeader)
      .subscribe((data: IData) => {
        this.serverErrorMessages = data.message;
      }, err => {
            if (err.status === 422) {
              this.serverErrorMessages = err.error.join('<br/>');
            }else {
              console.log('err', err)
                this.serverErrorMessages = err;
             }
      });
        await this.timeout(3000)
        this.toggleInfo = false;
        this.toggleForm = false;
        console.log('this.toggleForm', this.toggleForm)
    
    }
  }
timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

  toToggleInfo() {
    this.toggleInfo = !this.toggleInfo;
  }

showinfo(app) {
  this.userProfile = this.userService.getUserProfile().subscribe((res) => {
    this.userProfile = res;
    console.log('this.userProfile', this.userProfile);
  });
  this.content = "app";
  this.app = app;
  console.log('this.app', this.app)
  this.toggleInfo = !this.toggleInfo;
}

showReviews() {
  this.content = "reviews"
  var id = this.app.id;
  console.log('id', id)

  this.httpClient.get<Review[]>('http://localhost:3000/api/getReviews/' + id)
  .subscribe(data => {
    this.reviews = data;
    // this.sizeChange.emit(this.reviews);
    console.log('this.reviews', this.reviews)
  });
  
}

addReview() {
  this.post = "add";
  this.toggleInfo = false;
  this.toggleForm = true;

}

toToggleForm() {
  this.toggleForm = false;
  console.log('this.toggleForm', this.toggleForm);
}


  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.httpClient.get<App[]>('http://localhost:3000/api/apps')
      .subscribe(data => {
        this.apps = data;
        console.log('this.apps', this.apps)
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      });
  }

  

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

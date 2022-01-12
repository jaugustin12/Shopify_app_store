import { Component, OnInit } from '@angular/core';
import {BookService} from '../../services/book.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  showSuccessMessage: boolean;
  serverErrorMessages: string;

  constructor(public bookService: BookService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.bookService.postBook(this.bookService.selectedBook).subscribe(
      res => {
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
    this.bookService.selectedBook = {
      bookID: null,
      title: null,
      authors: null,
      averageRating: null,
      isbn: null,
      isbn13: null,
      languageCode: null,
      numPages: null,
      ratingsCount: null,
      textReviewsCount: null,
      publicationDate: null,
      publisher: null,
      comments: null
    };

    form.resetForm();
    this.serverErrorMessages = '';
  }
}

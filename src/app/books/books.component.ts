import { Component, OnChanges, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import {PageEvent} from '@angular/material/paginator';
import {MatPaginatorModule} from '@angular/material/paginator';
import { Book } from '../../models/book.model';
import { DataService } from 'src/services/data.service';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  commented;
  book;
  comments;
  toggleInfo = false;
  userProfile;
  messageFormControl = new FormControl('', [
    Validators.required
  ]);
  bookID;
  toggleComment = false;
  books;
  selectedBooks;
  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  mydata;
  searchFormControl = new FormControl('', [
    Validators.required,
  ]);

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  constructor(private bookService: BookService, private userService: UserService) {
  }


public setData(datas: any) {
  this.mydata = datas;
 }

  ngOnInit() {
    this.userProfile = this.userService.getUserProfile().subscribe((res) => {
      this.userProfile = res;
      console.log(this.userProfile);
    });
    console.log(this.userProfile);
    this.books = this.bookService.getAllBooks().subscribe((res) => {
      console.log('here books',res);
      this.books = res;
      this.length = this.books.length;

      let i;
      let totalbooks: Book[] = [];
      for (i = 0; i < this.length; i++) {
        totalbooks.push(this.books[i]);
      }
      this.books = totalbooks;
      console.log('this.books', this.books);


      let selected: Book[] = [];
      for (i = 0; i < this.pageSize; i++) {
        selected.push(this.books[i]);
      }

      this.selectedBooks = selected;
      console.log('this.selectedBooks', this.selectedBooks);
    });
  }

  change(event: PageEvent) {

    let max = event.pageSize * (1 + event.pageIndex);
    if (max > event.length) {
      max = event.length;
    }
    const min = event.pageSize * (0 + event.pageIndex);
    let i;
    let selected: Book[] = [];
    for (i = min; i < max; i++) {
      selected.push(this.books[i]);
    }
    this.selectedBooks = selected;

  }

  showComment(bookID) {
    this.toggleInfo = false;
    this.bookID = bookID;
    console.log('this.bookID', this.bookID);
    console.log('this.user here', this.userProfile);
    this.toggleComment = !this.toggleComment;
  }

  send() {
    this.userService.getUserProfile().subscribe((res) => {
      this.userProfile = res;
      this.userProfile = this.userProfile.user;
      console.log('rezzzzz', this.userProfile);
      const message = this.messageFormControl.value;
      console.log('this.user._id', this.userProfile._id);
      this.bookService.postComment(message, this.book, this.userProfile._id).subscribe((res2) => {
        console.log(res2);
      });
      this.toggleComment = !this.toggleComment;
    });
  }

  showinfo(book) {
    this.book = book;
    this.bookID = this.book.bookID;
    this.toggleInfo = !this.toggleInfo;
    this.bookService.getComments(this.bookID).subscribe((res) => {
      this.comments = res;
      console.log(res);
    });
    this.userService.getUserProfile().subscribe((res) => {
      this.userProfile = res;
      this.userProfile = this.userProfile.user;
      console.log('comments', this.book.comments);
      console.log('this.userProfile._id', this.userProfile._id);
      this.commented = this.book.comments.includes(this.userProfile._id);
    });
  }
  toggleinfo() {
    this.toggleInfo = !this.toggleInfo;
  }

  search() {
    console.log('this.searchFormControl.value', this.searchFormControl.value);
    this.bookService.getSomeBooks(this.searchFormControl.value).subscribe(res => {
      this.books = res;
      this.length = this.books.length;

      let i;
      let totalbooks: Book[] = [];
      for (i = 0; i < this.length; i++) {
        totalbooks.push(this.books[i]);
      }
      this.books = totalbooks;
      console.log('this.books', this.books);


      let selected: Book[] = [];
      for (i = 0; i < this.pageSize; i++) {
        selected.push(this.books[i]);
      }

      this.selectedBooks = selected;
      console.log('this.selectedBooks', this.selectedBooks);
    });
  }
}

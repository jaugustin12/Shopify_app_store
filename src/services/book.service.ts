import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})

export class BookService {
  selectedBook: Book = {
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

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True'})};

  constructor(private http: HttpClient, private data: DataService) {
  }

  getAllBooks() {
    return this.http.get(environment.apiBaseUrl + '/books');
  }

  getSomeBooks(search) {
    console.log(search);
    return this.http.get(environment.apiBaseUrl + '/getSearch/' + search);
  }

  postBook(book: Book) {
    return this.http.post(environment.apiBaseUrl + '/addBook' , book, this.noAuthHeader);
  }

  postComment(message, book, user) {
    // console.log('user', user);
    console.log('in service', {message, book, user});
    return this.http.post(environment.apiBaseUrl + '/addComment' , {message, book, user}, this.noAuthHeader);
  }

  getComments(bookid) {
    console.log('bookid', bookid);
    return this.http.get(environment.apiBaseUrl + '/getComments/' + bookid);
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {MatButtonModule} from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor} from '../auth/auth.interceptor';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from '../services/user.service';
import { DataService } from '../services/data.service';
import { BooksComponent } from './books/books.component';
import { BookService } from '../services/book.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatCardModule} from '@angular/material/card';
import { AddBookComponent } from './add-book/add-book.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';
import { AppsComponent } from './apps/apps.component';
import { DataTablesModule } from "angular-datatables";
import { MatSelectModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    BooksComponent,
    AddBookComponent,
    AppsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    NoopAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonToggleModule,
    MatInputModule,
    ReactiveFormsModule,
    DataTablesModule,
    MatSelectModule
  ],
  providers: [
    {
      provide:
        HTTP_INTERCEPTORS
      ,

      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard,
    UserService,
    DataService,
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

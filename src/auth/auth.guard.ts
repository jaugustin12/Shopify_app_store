import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route} from '@angular/router';
import {UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  loggedIn: boolean;
  user;

  constructor(private userService: UserService, private router: Router, private data: DataService) {
    this.data.editLoggedIn(this.userService.isLoggedIn());
    this.data.loggedIn.subscribe(loggedIn => this.loggedIn = loggedIn);
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
/*       console.log('this.loggedIn', this.loggedIn) */
      if (this.loggedIn === false) {
        this.router.navigateByUrl('/login');
        localStorage.removeItem(this.JWT_TOKEN);
        localStorage.removeItem(this.REFRESH_TOKEN);
        return false;
      } else {
        console.log('Userrrr', this.user);
        return true;
    }
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}

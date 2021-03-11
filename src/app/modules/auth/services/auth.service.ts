
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IUser, User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';

export interface AuthResponseData {
  user: User;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // crating user BehaviorSubject to indicate if user status had changed.
  private _user = new BehaviorSubject<IUser>(null);
  // checking if user is logged in.
  get userIsAuthenticated() {
    let userName = localStorage.getItem('user');
    return this._user.asObservable().pipe(
      map(user => {
        if (user || userName !== "") {
          return !!user || !!userName;
        } else {
          return false;
        }
      })
    );
  }
  // get current user.
  get user() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user;
        }
      })
    );
  }



  constructor(private router: Router) { }
  public login(
    email: string,
    password: string
  ) {
    const user = new User(
      email,
      password
    );
    //if login successful add current user to localstroge and navigate to the profiles page.
    if (user.email === "admin@admin.com" && user.password === "admin") {
      this.router.navigateByUrl('/git-profiles');
      localStorage.setItem("user", user.email);
      this._user.next(user);
      $("#wrapper").toggleClass("toggled");
    } else {
      let message = 'the email or password are wrong';
      Swal.fire({
        title: 'Error',
        icon: 'error',
        html: message
      })
    }

  }
  //when logout clear user and localstroge.
  logout() {
    this._user.next(null);
    localStorage.removeItem("user");
  }

}

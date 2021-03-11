import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  userName: string;
  private authSub: Subscription;
  private userSub: Subscription;
  constructor(private srvAuth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authSub = this.srvAuth.userIsAuthenticated.subscribe(data => {
      this.isLoggedIn = data;
      if (this.isLoggedIn) {
        this.userSub = this.srvAuth.user.subscribe(user => {
          if (user) {
            this.userName = user.email;
          } else {
            this.userName = localStorage.getItem('user');
          }

        });
      } else {
        if (this.userSub) {
          this.userSub.unsubscribe();
        }
      }
    });
  }

  onLogout() {
    this.userName = "";
    this.isLoggedIn = false;
    this.srvAuth.logout();
    this.router.navigateByUrl('/auth/login');
    $("#wrapper").toggleClass("toggled");
  }
  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}

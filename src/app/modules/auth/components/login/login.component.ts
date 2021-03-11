import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'fuel-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  @Input() user;
  isLoading = false;
  constructor(private srvAuth: AuthService,
    private router: Router,) { }

  // form validation initialization
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(this.user ? this.user.email : null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(this.user ? this.user.password : null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(5)]
      })
    });
  }

  // validating form, if all ok make login
  Login() {
    if (!this.form.valid) {
      return;
    }
    this.srvAuth.login(
      this.form.value.email,
      this.form.value.password
    );
  }
}

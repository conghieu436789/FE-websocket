import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {TokenStorageService} from '../../token/token-storage.service';
import {Router} from '@angular/router';
import {LoginInfor} from '../../models/login-infor';
import {first} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: '',
    password: ''
  };
  isLoginFailed = false;
  errorMessage: string = '';
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  onSubmit() {
    this.authService.login(new LoginInfor(this.form.username, this.form.password))
      .pipe(first()).subscribe(data =>{
        console.log(data);
        this.isLoginFailed = false;
        this.router.navigateByUrl("/product")
    },
      error => {
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    )
  }

}

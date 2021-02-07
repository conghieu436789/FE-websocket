import { Component, OnInit } from '@angular/core';
import {SignUpInfor} from '../../models/sign-up-infor';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signUpInfor !: SignUpInfor;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.signUpInfor = new SignUpInfor(this.form.username, this.form.password);
    this.authService.signUp(this.signUpInfor).pipe(first()).subscribe(
      data => {
        this.isSignUpFailed = false;
        this.router.navigate(['login']);
      },
      error => {
        this.errorMessage = error.message;
        this.isSignUpFailed = true;
      }
    )
  }
}

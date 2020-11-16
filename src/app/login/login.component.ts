import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { QuizService } from '../quiz.service';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  showSpinner = false;
  user: any;
  loggedIn = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              public quizService: QuizService,
              private socioAuthServ: AuthService) {

    this.loginForm = this.formBuilder.group({
      login: '',
      password: ''
    });

  }

  ngOnInit() {
    this.quizService.ready = true;
    this.socioAuthServ.authState.subscribe((user) => {
      // this.quizService.setUser(this.user);
      this.user = user;

      this.loggedIn = (user != null);

      console.log('Login User:' + this.user);

    });

  }

  onSubmit(loginData) {
    // Process checkout data here
    console.warn('You are logging in now...', this.user.name);
    this.quizService.setLogin(this.user.name, '');
    // this.quizService.setUser(this.user);

    // this.loginForm.reset();
    this.router.navigate(['/quiz']);
  }

  // Method to sign in with google.
  signIn(platform: string): void {
    platform = GoogleLoginProvider.PROVIDER_ID;
    this.socioAuthServ.signIn(platform).then(
      (response) => {
        console.log(platform + ' logged in user data is= ', response);
        this.user = response;
        this.router.navigate(['/quiz']);
      }
    );

  }


}


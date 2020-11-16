import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { QuizService } from './quiz.service';
import { templateJitUrl } from '@angular/compiler';

/**
 * Authentication Service for HSPT Quiz Application
 */

@Injectable() 
export class LocalauthService implements CanActivate {

  loggedIn: Observable<boolean>;
  user;

  constructor(private quizService: QuizService,
    private socioAuthServ: AuthService,
    public router: Router) {
      this.checkLogin();
  }

  checkLogin() {
    console.log("LocalauthService checkLogin");
    this.loggedIn = this.socioAuthServ.authState.pipe(map((user) => (user != null)));


  
    this.socioAuthServ.authState.subscribe((user) => {

      this.user = user;
      if (user != null) {
          console.log("found user");
          this.quizService.setAccessToken(user.idToken);
      } else {
         console.log("No user, back to login");
        this.router.navigate(['/login']);
      }
    });

     console.log("LocalauthService checkLogin end");
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
    console.log("LocalauthService canActivate");
    this.checkLogin();

    return this.loggedIn;
  }


    // Method to log out.
  signOut(): void {
    
    this.socioAuthServ.signOut();
    this.user = null;
    console.log('User signed out.');
     this.router.navigate(['/login']);
  }
  
}

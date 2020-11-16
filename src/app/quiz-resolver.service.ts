import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from './user';
import { Observable } from 'rxjs';
import { QuizService } from './quiz.service';

/**
 * QuizResolverService for HSPT Quiz Application
 */
@Injectable({
  providedIn: 'root'
})
export class QuizResolverService implements Resolve<User> {

  constructor(protected quizService: QuizService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.quizService.getUser();

  }
}

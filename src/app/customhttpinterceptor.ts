import { Observable, from } from 'rxjs';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import {QuizService } from './quiz.service';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import {
 HttpResponse,
 HttpErrorResponse
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

/**
 * HTTP Interceptor for HSPT Quiz Application
 */

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router,
              private quizService: QuizService,
              private route: ActivatedRoute) {}
  /*
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }
  */

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
      Promise<HttpEvent<any>> {
    const token = await this.quizService.getAccessToken();
    let changedRequest = request;
    // HttpHeader object immutable - copy values
    const headerSettings: {[name: string]: string | string[]; } = {};

    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key);
    }
    if (token) {
      headerSettings['Authorization'] = token;
    }
    headerSettings['Content-Type'] = 'application/json';
    const newHeader = new HttpHeaders(headerSettings);

    changedRequest = request.clone({
      headers: newHeader});
    return next.handle(changedRequest).toPromise();
  }


   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   return from(this.handleAccess(request, next))
     .pipe(
       retry(1),
       catchError((error: HttpErrorResponse) => {
         let errorMessage = '';
         if (error.error instanceof ErrorEvent) {
           // client-side error
           errorMessage = `Error: ${error.error.message}`;
         } else {
           // server-side error
           errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
         }
         // window.alert(errorMessage);
         console.error(errorMessage); 
         this.quizService.ready = true;
         this.router.navigate(['/login']);
         return throwError(errorMessage);
       })
     )
 }

}
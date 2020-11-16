import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Quiz } from './quiz';
import { Question } from './question';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { Answer } from './answer';
import { QuestionFeedback } from './questionfeedback';
import { Login } from './login';
import { Word } from './word';
import { User } from './user';
import { SocialUser } from 'angularx-social-login';


/**
 * QuizService for HSPT Quiz Application
 * Central class to manage quiz state and call backend API
 */
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private handleError: HandleError;
  public quiz: Quiz;
  private question: Question;
  private answer: Answer;
  private questionFeedback: QuestionFeedback;
  private login: Login;
  private failedWords: Word[];
  private token: string;

  public user: User;

  public ready = true;

  constructor(private http: HttpClient,
              httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');


  }

  getQuiz(): Quiz {
    return this.quiz;
  }

  updateQuiz() {
    console.log('updateQuiz()');
    this.http.get<Quiz>('/api/quiz/' + this.quiz.id, httpOptions)
      .subscribe(quiz => { this.quiz = quiz; console.log('updated quiz...'); });
  }

  getQuestion(): Question {
    console.log('getQuestion:' + this.question);
    return this.question;
  }

  getQuestionFeedback(): QuestionFeedback {
    console.log('getQuestionFeedback:' + this.questionFeedback);
    return this.questionFeedback;
  }

  getFailedWords(): Word[] {
    console.log('getFailedWords:' + this.getFailedWords);
    return this.failedWords;
  }

  ngOnDestroy() {
    console.log('quizService is destroyed');
  }

  createQuiz(user: User): Observable<Quiz> {
    console.log('createQuiz()');
    const oQuiz: Observable<Quiz> =
      this.http.post<Quiz>('/api/quiz/', user, httpOptions);

    oQuiz.subscribe(quiz => {
      this.quiz = quiz;
      });
    return oQuiz;


  }

  fetchQuestion() {
    this.http.get<Question>('/api/quiz/' + this.quiz.id + '/q', httpOptions)
      .subscribe(resp => {this.question =  resp; this.ready = true; } );
  }

  getUser(): Observable<User> {
     const oUser: Observable<User> = this.http.get<User>('/api/quiz/user', httpOptions);
      oUser.subscribe(user => { this.user = user; this.ready = true; console.log('getUser...'); });
      return oUser;
  }


    putUser(): Observable<User> {
     const oUser: Observable<User> = this.http.put<User>('/api/quiz/user', this.user, httpOptions);
      oUser.subscribe(user => { this.user = user; this.ready = true; console.log('getUser...'); });
      return oUser;
  }


  sendAnswer(choice: number) {
    this.answer = new Answer();
    this.answer.choice = choice;
    this.http.put<QuestionFeedback>('/api/quiz/' + this.quiz.id + '/q', this.answer, httpOptions)
      .subscribe(questionFeedback => this.questionFeedback = questionFeedback);
  }

  setLogin(user: string, password: string) {
    console.log('setLogin(' + user + ',' + password + ')');
    this.login = new Login();
    this.login.user = user;
    this.login.password = password;
  }

  /*
  setUser(user: SocialUser) {
    this.user = user;
  }
  */

  fetchFailedWords() {
    console.log('getFailedWords()');
    this.http.get<Word[]>('/api/quiz/' + this.quiz.id + '/failedwords', httpOptions)
      .subscribe(failedWords => { this.failedWords = failedWords; this.ready = true; console.log('getFailedWords...'); });

  }

  getAccessToken() {
    return this.token;
  }

  setAccessToken(token: string) {
    this.token = token;
  }

  getTestType() {
    let result: string;
    if (this.user == undefined) {
       result = "HSPT";
    } else {
      result = this.user.testType.toUpperCase();
    }

    console.log("getTestType:"+result);

    return result;

  }
}

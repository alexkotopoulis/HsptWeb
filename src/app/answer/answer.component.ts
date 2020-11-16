import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { QuizService } from '../quiz.service';
import { Quiz } from '../quiz';
import { QuestionFeedback } from '../questionfeedback';
import { LocalauthService } from '../localauth.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  quiz: Quiz;
  answerForm;
  failedWords;

  // questionFeedback: QuestionFeedback;



  constructor(private router: Router,
              private formBuilder: FormBuilder,
              public quizService: QuizService,
              public authService: LocalauthService) { 
      this.answerForm = this.formBuilder.group({
         answer: '',
         login: 'zzz',
         password: 'xxx'
      });
    this.quiz = this.quizService.getQuiz();
    this.quizService.updateQuiz();
    this.quizService.fetchFailedWords();
              }

  ngOnInit() {
    if (this.isFinished()) {
       this.failedWords = this.quizService.getFailedWords();
    }

  }

  onSubmit() {
    // Process checkout data here
    console.warn('Answer onSubmit');
    this.router.navigateByUrl('/question');
  }

  onSubmitNewTest() {
    // Process checkout data here
    console.warn('Answer onSubmit');
    this.router.navigateByUrl('/quiz');
  }

  isCorrect(): boolean {
    return (this.quizService.getQuestionFeedback().choice === this.quizService.getQuestionFeedback().correctChoice);
  }


  getTotalAnswered(): number {
        console.log('getTotalAnswered()');
        return this.quizService.getQuiz().numPass+this.quizService.getQuiz().numFail;
  }

  getPassPercentage(): number {
        console.log('getPassPercentage()');
        return Math.round(this.quizService.getQuiz().numPass/this.getTotalAnswered()*100);
  }

  isFinished() : boolean {
    console.log('isFinished(): '+this.getTotalAnswered() +'>='+this.quizService.getQuiz().numQuestions);
    return (this.getTotalAnswered() >= this.quizService.getQuiz().numQuestions);
  }



}

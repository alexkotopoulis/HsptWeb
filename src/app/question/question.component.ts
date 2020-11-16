import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { FormControl } from "@angular/forms";
import { QuizService } from '../quiz.service';
import { Quiz } from '../quiz';
import { Answer } from '../answer';
import { Validators } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { LocalauthService } from '../localauth.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  // quiz: Quiz;
  questionForm;
  // question;
  answer: Answer;
  // aList : Array<string>;

  // selectedAnswer: string;

  // radioSelected:string;
  //radioSelectedString:string;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    public quizService: QuizService,
    public authService: LocalauthService) {
    console.log('Question ctor');
    this.questionForm = this.formBuilder.group({
      selectedAnswer: ''
    });
    this.quizService.fetchQuestion();
  }

  ngOnInit() {
    console.log('Question ngOnInit');

  }

  onItemChange(qData) {
  }

  onSubmit(qData) {
    this.quizService.ready = false;

    // Process checkout data here
    console.warn('You submit question', qData);
    let answer = this.questionForm.get('selectedAnswer').value;
    console.warn('selectedAnswer', answer);
    let index = this.findFirstIndex(this.quizService.getQuestion().answers, answer);
    // window.alert('Your answer is:' + this.questionForm.get('answer').value);
    this.answer = new Answer();
    this.answer.choice = index;

    this.quizService.sendAnswer(index);

    this.questionForm.reset();
    this.router.navigate(['/answer']);
  }

  findFirstIndex(array: string[], word: string): number {
    for (let i in array) {
      if (array[i] == word) {
        return +i;
      }
    }
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { QuizService } from '../quiz.service';
import { LocalauthService } from '../localauth.service';
import { Quiz } from '../quiz';
import { AuthService} from 'angularx-social-login';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import 'hammerjs';

/**
 * Ouiz component: Main interface to conduct a quiz
 */

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quizForm;
  quiz: Quiz;
  user: User;

  @Input('showLoadingIndicator') showLoadingIndicator: boolean;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              public quizService: QuizService,
              public authService: LocalauthService,
              public socioAuthServ: AuthService,
              private route: ActivatedRoute) {
    console.warn('Quiz constructor');
    this.user = this.route.snapshot.data['user'];

    let randomStr = 'false';
    if (this.user.random) {
       randomStr = 'true';
    }
    console.log('randomStr:' + randomStr);

    this.quizForm = this.formBuilder.group({
      wordsRandom: randomStr,
      testType: this.user.testType,
      numQuestionsStr: '' + this.user.numQuestions

    });

  }

  ngOnInit() {
    console.warn('Quiz ngOnInit');
  }

  failSlider() {
    let firstTwo = this.user.failPct + this.user.rarePct;
    if (firstTwo > 100) {
      this.user.rarePct = this.user.rarePct - (firstTwo - 100); 
      this.user.passPct =  0;
    } else {
       let firstThree = firstTwo + this.user.passPct;
       this.user.passPct =  this.user.passPct - (firstThree - 100); 
    }
  }

  rareSlider() {
    let firstTwo = this.user.failPct + this.user.rarePct;
    if (firstTwo > 100) { 
      this.user.failPct = this.user.failPct - (firstTwo - 100); 
      this.user.passPct =  0;
    } else {
       let firstThree = firstTwo + this.user.passPct;
       this.user.passPct =  this.user.passPct - (firstThree - 100); 
    }
  }

    passSlider() {
    let firstTwo = this.user.failPct + this.user.passPct;
    if (firstTwo > 100) { 
      this.user.failPct = this.user.failPct - (firstTwo - 100); 
      this.user.passPct =  0;
    } else {
       let firstThree = firstTwo + this.user.rarePct;
       this.user.rarePct =  this.user.rarePct - (firstThree - 100); 
    }
  }


  onSubmit(loginData) {
    console.warn('quiz.onSubmit ' + this.user.numQuestions);
    this.user.random = (this.quizForm.get('wordsRandom').value === 'true');
    this.user.numQuestions = + this.quizForm.get('numQuestionsStr').value;
    this.user.testType = this.quizForm.get('testType').value;
    this.quizService.user = this.user;
    console.log('testType: ' + this.user.testType);
    if (this.user.numQuestions < 1 || this.user.numQuestions > 100 || isNaN(this.user.numQuestions)) {
      this.user.numQuestions = 20;
    }

    console.warn('numQuestions ' + this.user.numQuestions);

    this.quizService.ready = false;
    this.showLoadingIndicator = true;
    this.quizService.createQuiz(this.user).subscribe(quiz => {
      this.quizService.quiz = quiz;
      console.warn('quiz2');
      this.quiz = quiz;
      // window.alert('Quiz started: '+ this.quiz.id);
      this.quizForm.reset();
      this.quizService.ready = true;
      this.router.navigate(['/question']);
    });
  }


}

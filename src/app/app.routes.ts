import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';
import { LocalauthService } from './localauth.service';
import { QuizResolverService } from './quiz-resolver.service';


/**
 * Routes Module for HSPT Quiz Application
 */

export const APP_ROUTES: Routes = [
      { path: 'login', component: LoginComponent },
      { path: 'quiz', component: QuizComponent, canActivate: [LocalauthService],
        resolve: { user: QuizResolverService  }},
      { path: '', component: QuizComponent,
        resolve: { user: QuizResolverService },
        canActivate: [LocalauthService]  },
      { path: 'question', component: QuestionComponent, canActivate: [LocalauthService]  },
      { path: 'answer', component: AnswerComponent, canActivate: [LocalauthService]  },
];

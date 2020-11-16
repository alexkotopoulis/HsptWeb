import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
// import { FacebookLoginProvider } from 'angularx-social-login';
import { APP_ROUTES } from './app.routes';
import { LocalauthService } from './localauth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from './customhttpinterceptor';

import {
  MatRadioModule, MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatSliderModule, GestureConfig
} from '@angular/material';
import { IconsComponent } from './icons/icons.component';
import { CLIENT_ID } from 'src/environments/environment';


/**
 * Application module for HSPT Quiz Application
 */

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(CLIENT_ID)
  },
  /*
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('Facebook-App-Id')
  }
  */
]);



export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QuizComponent,
    QuestionComponent,
    AnswerComponent,
    IconsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatRadioModule,
    MatButtonModule,
    MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatSliderModule,
  MatProgressSpinnerModule,
  SocialLoginModule,

    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [LocalauthService,
              HttpErrorHandler,
              MessageService,
              { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
              {  provide: HTTP_INTERCEPTORS,
                 useClass: CustomHttpInterceptor,
                 multi: true
              },
               {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

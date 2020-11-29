# School Vocabulary Quiz Web Frontend

This project contains the web frontend portion of a web application to train and test for school vocabulary, in particular the High School Placement Test (HSPT) vocabulary questions in the Reading Comprehension section. \The frontend portion consists of a Angular-based Web UI that needs to be paired with the [SpringBoot-based backend](https://github.com/alexkotopoulis/HsptBackend).

The frontend and backend use [Google Sign-In](https://developers.google.com/identity/sign-in/web) for authentication of users. In order to deploy the web application you will need to sign up for Google Sign-In and create a Client ID. The id needs to be stored in /src/environments/environment.ts. Please see /src/environments/environment.ts.example for details.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { ShowTimeRoutingModule } from './show-time-routing.module';

import { QuestionComponent } from './question/question.component';

import { FinalScreenComponent } from './final-screen/final-screen.component';

import { QuestionService } from './question/question.service';
import { CounterComponent } from '@app/features/show-time/counter/counter.component';
import { QuizComponent } from '@app/features/show-time/quiz/quiz.component';
import { AnswersComponent } from '@app/features/show-time/answers/answers.component';
import { QuizHeadComponent } from '@app/features/show-time/quiz-head/quiz-head.component';
import { QuizHeadService } from '@app/features/show-time/quiz-head/quiz-head.service';
import { StreamVideoService } from '@app/core/stream/stream-video.service';
import { QuizService } from '@app/features/show-time/services/quiz.service';

@NgModule({
  imports: [
    SharedModule,
    ShowTimeRoutingModule
  ],
  exports: [
    CounterComponent
  ],
  declarations: [
    QuizComponent,
    CounterComponent,
    QuestionComponent,
    AnswersComponent,
    QuizHeadComponent,
    FinalScreenComponent
  ],
  providers: [
    QuizService,
    StreamVideoService,
    QuizHeadService,
    QuestionService
  ]
})
export class ShowTimeModule {}

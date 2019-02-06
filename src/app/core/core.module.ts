import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AnimationsService} from '@app/core/animations/animations.service';
import {TitleService} from '@app/core/title/title.service';
import {AuthService} from '@app/core/auth/auth.service';

import {StateService} from '@app/core/state/state.service';
import {SocketService} from '@app/core/socket/socket.service';
import {ShowTimeService} from '@app/features/show-time/show-time.service';
import {RouteGuardService} from '@app/core/auth/route-guard.service';
import {AuthGuardService} from '@app/core/auth/auth-guard.service';
import {HelpVideoService} from '@app/static/help-video/help-video.service';
import {StreamVideoService} from '@app/core/stream/stream-video.service';
import {VideoService} from '@app/core/video/video.service';
import {TimerService} from '@app/core/timer/timer.service';
import {QuizGuardService} from '@app/core/auth/quiz-guard.service';

import {QuizService} from '@app/features/show-time/services/quiz.service';
import {UserService} from '@app/features/user/services/user.service';
import {ExtraLivesService} from '@app/features/user/extra-lifes/services/extra-lives.service';
import {ConnectionHandlerService} from './socket/connection-handler.service';
import {LoggerService} from './logger/logger.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    providers: [
        AnimationsService,

        LoggerService,
        SocketService,
        ConnectionHandlerService,
        StateService,

        AuthService,
        RouteGuardService,
        AuthGuardService,
        QuizGuardService,

        QuizService,
        ExtraLivesService,
        UserService,

        TitleService,
        TimerService,
        ShowTimeService,

        VideoService,
        StreamVideoService,
        HelpVideoService
    ],
    exports: []
})
export class CoreModule {
    constructor(
        @Optional()
        @SkipSelf()
            parentModule: CoreModule
    ) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import only in AppModule');
        }
    }
}

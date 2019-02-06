// import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {DeviceDetectorModule, DeviceDetectorService} from 'ngx-device-detector';

import {CoreModule} from '@app/core';
import {SharedModule} from '@app/shared';
import {StaticModule} from '@app/static';

import {LoginModule} from '@app/features/login/login.module';
import {RegisterModule} from '@app/features/register/register.module';
import {ShowTimeModule} from '@app/features/show-time/show-time.module';
import {UserModule} from '@app/features/user/user.module';
import {NgxLogglyModule} from 'ngx-loggly-logger';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularFireModule} from "angularfire2";
import {AngularFirestoreModule} from 'angularfire2/firestore';


var config = {
    apiKey: "AIzaSyADtzKln5Zv3BHru-Jz8iKFB74BxwlIuUI",
    authDomain: "quizvideo-c53fc.firebaseapp.com",
    databaseURL: "https://quizvideo-c53fc.firebaseio.com",
    projectId: "quizvideo-c53fc",
    storageBucket: "quizvideo-c53fc.appspot.com",
    messagingSenderId: "325736013077"
};

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        BrowserAnimationsModule,
        NgxLogglyModule.forRoot(),

        // Core & shared
        CoreModule,
        SharedModule,

        // Third party modules
        DeviceDetectorModule.forRoot(),

        // Static
        StaticModule,

        // Features
        LoginModule,
        RegisterModule,
        ShowTimeModule,
        UserModule,
        AngularFireModule.initializeApp(config),
        AngularFirestoreModule,
        // app
        AppRoutingModule
    ],
    declarations: [AppComponent],
    providers: [
        DeviceDetectorService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
import {CanActivate, Routes, RouterModule} from '@angular/router';
import { HttpService} from './services/http.service';
import { LoginService} from './services/login.service';
import { UserService} from './services/user.service';
import { FileService} from './services/file.service';
import {SmileService} from './services/smile.service';
import {RegistrationService} from './services/registration.service';
 
import { AppComponent }   from './app-page/app.component';
import { LoginComponent }   from './login-page/login.component';
import { RegistrationComponent }   from './registration-page/registration.component';
import { MainComponent }   from './main-page/main.component';
import { MessageComponent }   from './message-page/message.component';
import { SmileComponent }   from './smile-page/smile.component';
import { HistoryComponent }   from './history-page/history.component';


import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS }   from '@angular/common/http';


import { ScrollDispatchModule } from '@angular/cdk/scrolling';

// определение маршрутов
const appRoutes: Routes =[
    { path: 'login', component: LoginComponent},
    { path: 'registration', component: RegistrationComponent},
    { path: '*', component: LoginComponent},
    { path: '', component: LoginComponent},
    { path: 'main', component: MainComponent},
    { path: 'history', component: HistoryComponent}
];
 
@NgModule({
    imports:      [
        BrowserModule, 
        FormsModule, 
        RouterModule.forRoot(appRoutes), 
        HttpClientModule,
        ScrollDispatchModule,
        ReactiveFormsModule,
    ],
    exports: [RouterModule],
    declarations: [
        AppComponent,
        LoginComponent,
        RegistrationComponent,
        MainComponent,
        SmileComponent,
        HistoryComponent
    ],
    providers:    [
        HttpService,
        LoginService,
        UserService,
        SmileService,
        FileService,
        RegistrationService,
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: InterceptorOne,
        //     multi: true,
        //   },
        ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
import {CanActivate, Routes, RouterModule} from '@angular/router';
import { HttpService} from './services/http.service';
import { LoginService} from './services/login.service';
import { UserService} from './services/user.service';
import {SmileService} from './services/smile.service'
import { FormsModule }   from '@angular/forms';
 
import { AppComponent }   from './app-page/app.component';
import { LoginComponent }   from './login-page/login.component';
import { MainComponent }   from './main-page/main.component';
import {SmileComponent} from './smile-page/smile.component';


import { HttpClientModule, HTTP_INTERCEPTORS }   from '@angular/common/http';

import {LoginRouteGuard} from './guard';

import { ScrollDispatchModule } from '@angular/cdk/scrolling';

// определение маршрутов
const appRoutes: Routes =[
    { path: 'login', component: LoginComponent},
    { path: '*', component: LoginComponent},
    { path: '', component: LoginComponent},
    { path: 'main', component: MainComponent},
    { path: 'registration', loadChildren: './registration.module#RegistrationModule'},
    { path: 'history', loadChildren: './history.module#HistoryModule'}
];
 
@NgModule({
    imports:      [
        BrowserModule, 
        FormsModule, 
        RouterModule.forRoot(appRoutes), 
        HttpClientModule,
        ScrollDispatchModule
    ],
    exports: [RouterModule],
    declarations: [
        AppComponent,
        LoginComponent,
        MainComponent,
        SmileComponent
    ],
    providers:    [
        LoginRouteGuard,
        HttpService,
        LoginService,
        UserService,
        SmileService
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: InterceptorOne,
        //     multi: true,
        //   },
        ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
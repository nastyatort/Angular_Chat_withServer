import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
import {CanActivate, Routes, RouterModule} from '@angular/router';
import { HttpService} from './services/http.service';
import { LoginService} from './services/login.service';
import { UserService} from './services/user.service';
import { RegistrationService} from './services/registration.service';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
 
import { AppComponent }   from './app-page/app.component';
import { LoginComponent }   from './login-page/login.component';
import { RegistrationComponent }   from './registration-page/registration.component';
import { MainComponent }   from './main-page/main.component';
import { PhoneComponent }   from './phone-page/phone.component';
import { ModalComponent }   from './modal-page/modal.component';
import {InterceptorOne} from './interceptors/interceptor';

import { HttpClientModule, HTTP_INTERCEPTORS }   from '@angular/common/http';

import {LoginRouteGuard} from './guard';

// определение маршрутов
const appRoutes: Routes =[
    { path: 'login', component: LoginComponent},
    { path: 'registration', component: RegistrationComponent},
    { path: '*', component: LoginComponent},
    { path: '', component: LoginComponent},
    { path: 'about', loadChildren: './about.module#AboutModule', canActivate: [LoginRouteGuard]},        
    { path: 'main', component: MainComponent, canActivate: [LoginRouteGuard]},
];
 
@NgModule({
    imports:      [
        BrowserModule, 
        FormsModule, 
        RouterModule.forRoot(appRoutes), 
        HttpClientModule,
        ReactiveFormsModule,
    ],
    exports: [RouterModule],
    declarations: [
        AppComponent,
        LoginComponent,
        MainComponent,
        PhoneComponent,
        ModalComponent,
        RegistrationComponent
    ],
    providers:    [
        LoginRouteGuard,
        HttpService,
        LoginService,
        UserService,
        RegistrationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorOne,
            multi: true,
          },
        ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
 
import {Routes, RouterModule} from '@angular/router';
 
import { UserinfoComponent }   from './userinfo-page/userinfo.component';
import { AppinfoComponent }   from './appinfo-page/appinfo.component';

import {LoginRouteGuard} from './guard';
import { AboutComponent }   from './about-page/about.component';

import { ReactiveFormsModule } from '@angular/forms';

// определение маршрутов
const appRoutes: Routes =[
    { path: '', component:   AboutComponent, canActivate: [LoginRouteGuard]},
    { path: 'userinfo', component: UserinfoComponent, canActivate: [LoginRouteGuard]},
    { path: 'appinfo', component: AppinfoComponent, canActivate: [LoginRouteGuard]}
];

@NgModule({
    imports:      [
        RouterModule.forChild(appRoutes),
        ReactiveFormsModule,
        CommonModule
    ],
    declarations: [
        UserinfoComponent,
        AppinfoComponent,
        AboutComponent,
    ]
})
export class AboutModule { }
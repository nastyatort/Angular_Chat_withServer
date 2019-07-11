import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
 
import {Routes, RouterModule} from '@angular/router';

import { RegistrationComponent }   from './registration-page/registration.component';
import {RegistrationService} from './services/registration.service';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';

// определение маршрутов
const appRoutes: Routes =[
    { path: '', component:   RegistrationComponent},
];

@NgModule({
    imports:      [
        RouterModule.forChild(appRoutes),
        ReactiveFormsModule,
        CommonModule,
        FormsModule
    ],
    declarations: [
        RegistrationComponent
    ],
    providers: [
        RegistrationService 
    ]
})
export class RegistrationModule { }
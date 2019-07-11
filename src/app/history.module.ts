import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
 
import {Routes, RouterModule} from '@angular/router';

import { HistoryComponent }   from './history-page/history.component';
import {HttpService} from './services/http.service';

// определение маршрутов
const appRoutes: Routes =[
    { path: '', component:   HistoryComponent},
];

@NgModule({
    imports:      [
        RouterModule.forChild(appRoutes),
        CommonModule
    ],
    declarations: [
        HistoryComponent
    ],
    providers: [
        HttpService 
    ]
})
export class HistoryModule { }
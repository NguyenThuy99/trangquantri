import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import {TinTucComponent} from './tintuc/tintuc.component';
import { from } from 'rxjs';
const routes: Routes = [
  {
    path: 'tintuc',
    component: TinTucComponent
  }
];

@NgModule({
  declarations: [TinTucComponent],
  imports: [
    CommonModule,
    SharedModule
    
  ]
})
export class TintucModule { }

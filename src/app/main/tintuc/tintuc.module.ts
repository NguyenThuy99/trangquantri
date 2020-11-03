import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import {TinTucComponent} from './tintuc/tintuc.component';
import { from } from 'rxjs';
import { LoaitinComponent } from './loaitin/loaitin.component';
import { ChudeComponent } from './chude/chude.component';
import { LoaichudeComponent } from './loaichude/loaichude.component';
import { ThucdonComponent } from './thucdon/thucdon.component';
import { TkbComponent } from './tkb/tkb.component';

const routes: Routes = [
  {
    path: 'tintuc',
    component: TinTucComponent
  },
  {
    path: 'loaitin',
    component: LoaitinComponent
  },
  {
    path: 'loaichude',
    component:LoaichudeComponent
  },
  {
    path: 'chude',
    component: ChudeComponent
  } ,
  {
    path: 'thucdon',
    component: ThucdonComponent
  } ,
  {
    path: 'tkb',
    component: TkbComponent
  } 
];
@NgModule({
  declarations: [TinTucComponent, LoaitinComponent,ChudeComponent,LoaichudeComponent, ThucdonComponent, TkbComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
    
  ]
})

export class TintucModule { }

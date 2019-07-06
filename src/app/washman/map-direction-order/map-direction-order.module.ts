import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapDirectionOrderPage } from './map-direction-order.page';

const routes: Routes = [
  {
    path: '',
    component: MapDirectionOrderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MapDirectionOrderPage]
})
export class MapDirectionOrderPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonicModule } from '@ionic/angular';

import { GpsMapPage } from './gps-map.page';

const routes: Routes = [
  {
    path: '',
    component: GpsMapPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GpsMapPage],
  providers: [Geolocation]
})
export class GpsMapPageModule {}

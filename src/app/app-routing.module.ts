import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'callwash',
    loadChildren: './user/callwash/callwash.module#CallwashPageModule'
  },
  {
    path: 'location-list', loadChildren: './user/location-list/location-list.module#LocationListPageModule'
  },
  {
    path: 'location-add-detail', loadChildren: './user/location-add-detail/location-add-detail.module#LocationAddDetailPageModule'
  },
  {
    path: 'gps-map', loadChildren: './user/gps-map/gps-map.module#GpsMapPageModule'
  },
  {
    path: 'edit-location', loadChildren: './user/edit-location/edit-location.module#EditLocationPageModule'
  },
  {
    path: 'washman/home', loadChildren: './washman/home/home.module#HomePageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
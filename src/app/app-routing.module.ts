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
    path: 'location-list/:id', loadChildren: './user/edit-location/edit-location.module#EditLocationPageModule'
  },
  {
    path: 'washman/home', loadChildren: './washman/home/home.module#HomePageModule'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  {
    path: 'wash-cancel',
    loadChildren: './washman/wash-cancel/wash-cancel.module#WashCancelPageModule'
  },
  {
    path: 'map-direction',
    loadChildren: './washman/map-direction/map-direction.module#MapDirectionPageModule'
  },
  {
    path: 'cancellation', loadChildren: './user/cancellation/cancellation.module#CancellationPageModule'
  },
  {
    path: 'orders', loadChildren: './washman/orders/orders.module#OrdersPageModule'
  },
  {
    path: 'rating', loadChildren: './user/rating/rating.module#RatingPageModule'
  },
  { path: 'order-detail', loadChildren: './washman/order-detail/order-detail.module#OrderDetailPageModule' },
  { path: 'map-direction-order', loadChildren: './washman/map-direction-order/map-direction-order.module#MapDirectionOrderPageModule' },
  { path: 'home-detail', loadChildren: './washman/home-detail/home-detail.module#HomeDetailPageModule' }


  // { path: 'developers', loadChildren: './pages/developers/developers.module#DevelopersPageModule' },
  // { path: 'developers/:id', loadChildren: './pages/developer/developer.module#DeveloperPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { WashCancelPageModule } from './washman/wash-cancel/wash-cancel.module';
import { CancellationPageModule } from './user/cancellation/cancellation.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { LocationListPageModule } from './user/location-list/location-list.module';

import { MoreLocationListComponent } from './more-location-list/more-location-list.component';
import { Firebase } from '@ionic-native/firebase/ngx'
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { IonicRatingModule } from 'ionic4-rating';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyDl-aQ9SopSAdG-ehn1tj8ijAZjUplQXbo",
  authDomain: "ionic-242807.firebaseapp.com",
  databaseURL: "https://ionic-242807.firebaseio.com",
  projectId: "ionic-242807",
  storageBucket: "ionic-242807.appspot.com",
  messagingSenderId: "864780708661",
  appId: "1:864780708661:web:db8dc8947c3fdbd8"
};


@NgModule({
  declarations: [AppComponent, MoreLocationListComponent],
  entryComponents: [MoreLocationListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    LocationListPageModule,
    CancellationPageModule,
    WashCancelPageModule,
    IonicRatingModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite,
    SQLitePorter
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

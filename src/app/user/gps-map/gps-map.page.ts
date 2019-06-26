import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
declare var google;

@Component({
  selector: 'app-gps-map',
  templateUrl: './gps-map.page.html',
  styleUrls: ['./gps-map.page.scss'],
})
export class GpsMapPage implements AfterViewInit {

  MyLocation: any;
  latitude: any;
  longtitude: any;


  @ViewChild('mapElement') mapNativeElement: ElementRef;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(private geolocation: Geolocation, private router: Router) { }

  ngAfterViewInit(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longtitude = resp.coords.longitude;
      const options = {
        zoom: 15,
        mapTypeId: 'terrain'
      };
      const map = new google.maps.Map(this.mapNativeElement.nativeElement, options);
      const infoWindow = new google.maps.InfoWindow;
      const pos = {
        lat: this.latitude,
        lng: this.longtitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('My Location');
      infoWindow.open(map);

      // console.log('Latitue :', this.latitude);
      // console.log('Longtitue :', this.longtitude);
      map.setCenter(pos);

      this.directionsDisplay.setMap(map);

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  addDetails() {
    // Send lat long to callwash
    let latlong: NavigationExtras = {
      state: {
        latt: this.latitude,
        long: this.longtitude
      }
    }
    this.router.navigate(['callwash'], latlong);
    this.router.navigateByUrl("/location-add-detail");

  }


}

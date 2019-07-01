import { Component, AfterViewInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
declare var google;

@Component({
  selector: 'app-map-direction',
  templateUrl: './map-direction.page.html',
  styleUrls: ['./map-direction.page.scss'],
})
export class MapDirectionPage implements AfterViewInit {

  Destination: any;
  MyLocation: any;

  // Params Destination
  // latt = 16.458651;
  // long = 102.827978;
  latt: any;
  long: any;

  constructor(private alertController: AlertController,
    private router: Router,
    public navHttp: Http,
    public http: HttpClient) { }

  ngAfterViewInit(): void {
    let directionsDisplay = new google.maps.DirectionsRenderer;
    const options = {
      zoom: 15,
      center: {
        lat: 16.458651,
        lng: 102.827978
      }
    };
    const map = new google.maps.Map(document.getElementById('map'), options);
    directionsDisplay.setMap(map);

    let url: string = "http://127.0.0.1:8000/api/getAddress";
    let dataJson = new FormData();
    // dataJson.append('tid', tid); // insert tid to wash
    let data: Observable<any> = this.http.post(url, dataJson)
    data.subscribe(res => {
      if (res != null) {
        this.latt = parseFloat(res.status[0].user_latitude);
        this.long = parseFloat(res.status[0].user_longtitude);

      }
    });


  }

  // Alert Accept
  async acceptAlert() {
    const alert = await this.alertController.create({
      header: 'ยืนยันคำร้อง',
      message: '',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel'
        },
        {
          text: 'ตกลง',
          role: 'confirm',
          handler: () => {

          }
        }
      ]
    });
    await alert.present();
  }

  // Alert Cancel
  async cancelAlert() {
    const alert = await this.alertController.create({
      header: 'เหตุผลยกเลิก',
      message: '',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel'
        },
        {
          text: 'ยืนยัน',
          role: 'confirm',
          handler: () => {

          }
        }
      ]
    });
    await alert.present();
  }

  // Fuction Route
  calculateAndDisplayRoute() {
    let that = this;
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    // Map Center
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: {
        lat: 16.458651,
        lng: 102.827978
      }
    });
    directionsDisplay.setMap(map);

    if (navigator.geolocation) {
      // Current Location
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
        that.MyLocation = new google.maps.LatLng(pos);
      });
    } else {
      // Browser doesn't support Geolocation
    }

    // Lat long Destination
    var pos_des = {
      lat: this.latt,
      lng: this.long
    }
    this.Destination = new google.maps.LatLng(pos_des);

    // // Distance between 2 direction
    let distance = (google.maps.geometry.spherical.computeDistanceBetween(this.MyLocation, this.Destination) / 1000).toFixed(2);
    // console.log('Distance :', distance, ' Kilometer');

    // Route direction
    directionsService.route({
      origin: this.MyLocation,
      destination: this.Destination,
      travelMode: google.maps.TravelMode.DRIVING
    }, function (response, status) {

      // Display the duration
      let duraInt = Math.floor(((response.routes[0].legs[0].duration.value) / 60));
      let duraFloat = Math.floor(((response.routes[0].legs[0].duration.value) % 60));
      // console.log(duraInt + '.' + duraFloat);
      document.getElementById('duration').innerHTML = +duraInt + '.' + duraFloat + " นาที";

      // Display the distance
      document.getElementById('distance').innerHTML = +response.routes[0].legs[0].distance.value + " เมตร";

      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}

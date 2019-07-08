import { WashCancelPage } from './../wash-cancel/wash-cancel.page';
import { Component, AfterViewInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
declare var google;

@Component({
  selector: 'app-map-direction-order',
  templateUrl: './map-direction-order.page.html',
  styleUrls: ['./map-direction-order.page.scss'],
})
export class MapDirectionOrderPage {
  Destination: any;
  MyLocation: any;

  // Params Destination
  // latt = 16.458651;
  // long = 102.827978;
  latt: any;
  long: any;
  tid: any;
  address: any;
  username: any;
  service: any;
  price: any;

  constructor(private alertController: AlertController,
    private router: Router,
    public navHttp: Http,
    public http: HttpClient,
    private route: ActivatedRoute,
    public modalController: ModalController) {

    // Receive params from order details
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.tid = this.router.getCurrentNavigation().extras.state.tid;
      }
    });
  }

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

    let url: string = "http://127.0.0.1:8000/api/getAddressOrder";
    let dataJson = new FormData();
    dataJson.append('tid', this.tid); // insert tid to wash
    let data: Observable<any> = this.http.post(url, dataJson)
    data.subscribe(res => {
      if (res != null) {
        // console.log(res);
        this.latt = parseFloat(res.status[0].user_latitude);
        this.long = parseFloat(res.status[0].user_longtitude);
        this.address = res.status[0].user_address;
        this.username = res.status[0].user_id;
        this.service = res.status[0].user_service;
        if (this.service == 1) this.service = 'ซัก';
        if (this.service == 2) this.service = 'อบ';
        if (this.service == 12) this.service = 'ซัก,อบ';
        this.price = res.status[0].user_price;
      }
    });
  }

  // Alert Accept
  async acceptAlert() {
    const alert = await this.alertController.create({
      header: 'ยืนยันการส่งผ้า',
      message: '',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'confirm',
        },
        {
          text: 'ตกลง',
          role: 'confirm',
          handler: () => {
            let url: string = "http://127.0.0.1:8000/api/sentOrderFinish";
            let dataJson = new FormData();
            dataJson.append('tid', this.tid); // insert tid to wash
            let data: Observable<any> = this.http.post(url, dataJson)
            data.subscribe(res => {
              if (res != null) {
                console.log('Change status = 4 Finish');
                this.router.navigateByUrl('orders');
              }
            });
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
      // center: {
      //   lat: 16.458651,
      //   lng: 102.827978
      // }
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
      // document.getElementById('duration').innerHTML = +duraInt + '.' + duraFloat + " นาที";

      // Display the distance
      // document.getElementById('distance').innerHTML = +response.routes[0].legs[0].distance.value + " เมตร";

      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}

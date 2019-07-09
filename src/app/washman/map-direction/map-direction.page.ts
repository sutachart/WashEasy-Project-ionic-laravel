import { WashCancelPage } from './../wash-cancel/wash-cancel.page';
import { Component, AfterViewInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;

@Component({
  selector: 'app-map-direction',
  templateUrl: './map-direction.page.html',
  styleUrls: ['./map-direction.page.scss'],
})
export class MapDirectionPage implements AfterViewInit {

  Destination: any;
  MyLocation: any;

  latitude: any;
  longtitude: any;

  // Params Destination
  latt: any;
  long: any;

  // Params get database
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
    public modalController: ModalController,
    private geolocation: Geolocation) {

    // Receive params from callwash
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.tid = this.router.getCurrentNavigation().extras.state.tid;
      }
    });

  }

  ngAfterViewInit(): void {
    // Get Address from database
    let url: string = "http://127.0.0.1:8000/api/getAddress";
    let dataJson = new FormData();
    dataJson.append('tid', this.tid); // where tid to wash
    let data: Observable<any> = this.http.post(url, dataJson)
    data.subscribe(res => {
      if (res != null) {
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

    // var interval = setInterval(this.calculateAndDisplayRoute, 5000);
  }

  // Fuction Route
  calculateAndDisplayRoute() {
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

    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude
      this.longtitude = resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    // Lat long Mylocation
    var pos = {
      lat: this.latitude,
      lng: this.longtitude
    };
    map.setCenter(pos);
    this.MyLocation = new google.maps.LatLng(pos);

    // Lat long Destination
    var pos_des = {
      lat: this.latt,
      lng: this.long
    }
    this.Destination = new google.maps.LatLng(pos_des);

    // // Distance between 2 direction
    let distance = (google.maps.geometry.spherical.computeDistanceBetween(this.MyLocation, this.Destination) / 1000).toFixed(2);
    console.log('Distance :', distance, ' Kilometer');

    // Route direction
    directionsService.route({
      origin: this.MyLocation,
      destination: this.Destination,
      travelMode: 'DRIVING'
    }, function (response, status) {

      // Display the duration time
      let duraInt = Math.floor(((response.routes[0].legs[0].duration.value) / 60));
      let duraFloat = Math.floor(((response.routes[0].legs[0].duration.value) % 60));
      console.log(duraInt + '.' + duraFloat + ' นาที');
      // document.getElementById('duration').innerHTML = +duraInt + '.' + duraFloat + " นาที";

      // Display the distance
      // document.getElementById('distance').innerHTML = +response.routes[0].legs[0].distance.value + " เมตร";

      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      }
      // else {
      //   window.alert('Directions request failed due to ' + status);
      // }
    });
  }


  
  // Alert Accept
  async acceptAlert() {
    const alert = await this.alertController.create({
      header: 'ยืนยันคำร้อง',
      message: '<br>ชื่อ : ' + this.username + '<br>บริการ : ' + this.service + '<br>ราคา : ' + this.price + ' บาท',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'confirm',
        },
        {
          text: 'ตกลง',
          role: 'confirm',
          handler: () => {
            let url: string = "http://127.0.0.1:8000/api/acceptRequest";
            let dataJson = new FormData();
            dataJson.append('tid', this.tid); // where tid to wash
            // dataJson.append('status', '1'); // update status = 1
            let data: Observable<any> = this.http.post(url, dataJson)
            data.subscribe(res => {
              if (res != null) {
                console.log('Change status = 1');
                this.router.navigateByUrl('home');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  // Cancel
  async cancelCall() {
    const modal = await this.modalController.create({
      component: WashCancelPage,
      componentProps: {
        // "paramID": 123,
        "tid": this.tid
      },
      cssClass: 'cancelation-modal-css'
    });
    return await modal.present();
    // this.status = null;
  }
}

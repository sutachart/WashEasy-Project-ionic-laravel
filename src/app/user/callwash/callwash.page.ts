import { LocationListPage } from './../location-list/location-list.page';
import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
// import { ModalPagePage } from '../modal-page/modal-page.page';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-callwash',
  templateUrl: './callwash.page.html',
  styleUrls: ['./callwash.page.scss'],
})
export class CallwashPage {
  dataReturned: any;
  datetime: string; // keep Date & Time
  i: any; // for Loop

  //Services
  price: any; // price of service
  select: any; // keep number service choice
  serv_name: any; // keep name service choice

  washService: boolean = false;
  steamService: boolean = false;

  constructor(public modalController: ModalController,
    private router: Router,
    public navHttp: Http,
    public http: HttpClient,
    private alertController: AlertController) {

  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: LocationListPage,
      componentProps: {
        // "paramID": 123,
        // "paramTitle": "Test Title"
      },
      cssClass: 'my-custom-modal-css'
    });
  // ---------------------
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });
    return await modal.present();
  }

  booleanChange() {

    // Service & Price
    this.price = 0;
    if (this.washService == true) {
      this.select = '1';
      this.price += 50;
    }
    if (this.steamService == true) {
      this.select = '2';
      this.price += 50;
    }
    if (this.washService == true && this.steamService == true) {
      this.select = '12';
    }
    if (this.select == 1) this.serv_name = 'ซัก';
    if (this.select == 2) this.serv_name = 'อบ';
    if (this.select == 12) this.serv_name = 'ซัก,อบ';

    //  Current Date time
    let date = new Date().toLocaleString();
    this.datetime = date;

    console.log('Wash :', this.washService);
    console.log('Steam :', this.steamService);
    console.log('Service :', this.select);
    console.log('Price :', this.price);
    console.log('Datetime :', this.datetime);

  }

  // Alert confirm
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'ยืนยันการเรียก',
      // subHeader: 'Sub header',
      message: '<br>บริการ : ' + this.serv_name + '<br> ' + 'ราคา : ' + this.price,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {

            console.log("Confirm!");
            let url: string = "http://localhost:8000/api/insertCallwash";
            let dataJson = new FormData();
            dataJson.append('serv_price', this.price); // total Price
            dataJson.append('serv_choice', this.select); // total Choice
            dataJson.append('serv_date', this.datetime); // date time

            let data: Observable<any> = this.http.post(url, dataJson)
            data.subscribe(res => {
              if (res != null)
                console.log(res);
            });
            this.router.navigateByUrl('/home');


          }
        }
      ]
    });
    await alert.present();
  }
}

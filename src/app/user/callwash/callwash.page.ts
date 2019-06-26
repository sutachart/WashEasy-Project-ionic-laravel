import { LocationListPage } from './../location-list/location-list.page';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatabaseService, Dev } from './../../services/database.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-callwash',
  templateUrl: './callwash.page.html',
  styleUrls: ['./callwash.page.scss'],
})
export class CallwashPage {
  //SQLite
  developerss: Dev;

  // developer = {};

  selectedView = 'devs';
  // -SQLite

  dataReturned: any;
  datetime: string; // keep Date & Time
  i: any; // for Loop

  //Services
  price: any; // price of service
  select: any; // keep number service choice
  serv_name: any; // keep name service choice

  washService: boolean = false;
  steamService: boolean = false;

  // Get lat Long
  latt: any;
  long:any;

  constructor(
    public modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    public navHttp: Http,
    public http: HttpClient,
    private alertController: AlertController,
    private db: DatabaseService) {

    // Get Params from Gps-map
    this.route.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state){
        this.latt = this.router.getCurrentNavigation().extras.state.latt;
        this.long = this.router.getCurrentNavigation().extras.state.long;
      }
      console.log(this.latt,' ',this.long);
    });
  }

  ngOnInit() { }

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

  reLoad() {
    console.log(this.db.getDeveloper(this.dataReturned));
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

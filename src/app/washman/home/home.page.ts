import { Component, AfterViewInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements AfterViewInit {
  dataReturned: any;

  // Param array
  public resent = [];

  public orders = [
    { id: '0', name: 'Order1' },
    { id: '1', name: 'Order2' },
    { id: '2', name: 'Order3' }
  ]
  constructor(
    private alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute,
    public modalController: ModalController,
    public navHttp: Http,
    public http: HttpClient) { }

  // async acceptOrder(orderId) {
  //   const alert = await this.alertController.create({
  //     header: 'ยืนยัน',
  //     message: 'ยืนยันที่จะรับรายการ' + this.orders[orderId].name + '?',
  //     buttons: [
  //       {
  //         text: 'ยกเลิก',
  //         role: 'cancel'
  //       },
  //       {
  //         text: 'ยืนยัน',
  //         role: 'confirm',
  //         handler: () => {
  //           // console.log("Confirm!");
  //           // let url: string = "http://localhost:8000/api/insertCallwash";
  //           // let dataJson = new FormData();
  //           // dataJson.append('serv_price', this.price); // total Price
  //           // dataJson.append('serv_choice', this.select); // total Choice
  //           // dataJson.append('serv_date', this.datetime); // date time

  //           // let data: Observable<any> = this.http.post(url, dataJson)
  //           // data.subscribe(res => {
  //           //   if (res != null)
  //           //     console.log(res);
  //           // });
  //           // this.router.navigateByUrl('/home');
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  // async presentModal() {
  //   const modal = await this.modalController.create({
  //     component: CallwashPage,
  //     componentProps: {
  //       // "paramID": 123,
  //       // "paramTitle": "Test Title"
  //     },
  //     cssClass: 'my-custom-modal-css'
  //   });
  //   // ---------------------
  //   modal.onDidDismiss().then((dataReturned) => {
  //     if (dataReturned !== null) {
  //       this.dataReturned = dataReturned.data;
  //       //alert('Modal Sent Data :'+ dataReturned);
  //     }
  //   });
  //   return await modal.present();
  // }

  ngAfterViewInit() {
    let url: string = "http://127.0.0.1:8000/api/getCallwash";
    let dataJson = new FormData();
    let data: Observable<any> = this.http.post(url, dataJson)
    data.subscribe(res => {
      if (res != null) {
        this.resent = res;
        console.log(this.resent);
      }
    });
  }

  fetchAddress(tid) {
    // console.log(tid);
    let tidFromWashman: NavigationExtras = {
      state: {
        tid: tid
      }
    }
    this.router.navigate(['map-direction'], tidFromWashman);

  }
}
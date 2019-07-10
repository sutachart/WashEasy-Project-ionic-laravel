import { WashCancelPage } from './../wash-cancel/wash-cancel.page';
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
  public status = [];

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

  ngAfterViewInit() {
    let url: string = "http://127.0.0.1:8000/api/getCallwash";
    let dataJson = new FormData();
    let data: Observable<any> = this.http.post(url, dataJson)
    data.subscribe(res => {
      if (res != null) {
        this.resent = res.status;

        let url: string = "http://127.0.0.1:8000/api/acceptCallwash";
        let dataJson = new FormData();
        let data: Observable<any> = this.http.post(url, dataJson)
        data.subscribe(res => {
          if (res != null) {
            this.status = res.status;
            // console.log(this.resent);
          }
        });
      }
    });
  }

  fetchAddress(tid) {
    let tidFromWashman: NavigationExtras = {
      state: {
        tid: tid
      }
    }
    this.router.navigate(['home-detail'], tidFromWashman);
  }

  takeOrder(tid) {
    let tidFromWashman: NavigationExtras = {
      state: {
        tid: tid
      }
    }
    this.router.navigate(['map-direction'], tidFromWashman);
  }

  // async takeOrder(tid) {
  //   const alert = await this.alertController.create({
  //     header: 'ยืนยันการรับผ้า',
  //     message: '',
  //     buttons: [
  //       {
  //         text: 'ยกเลิก',
  //         role: 'cancel',
  //       },
  //       {
  //         text: 'ตกลง',
  //         role: 'confirm',
  //         handler: () => {
  //           let url: string = "http://127.0.0.1:8000/api/takeOrder";
  //           let dataJson = new FormData();
  //           dataJson.append('tid', tid); // insert tid to wash
  //           // dataJson.append('status', '2'); // update status = 2
  //           let data: Observable<any> = this.http.post(url, dataJson)
  //           data.subscribe(res => {
  //             if (res != null) {
  //               console.log('Change status = 2');
  //               this.router.navigateByUrl('home');
  //             }
  //           });
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }
}
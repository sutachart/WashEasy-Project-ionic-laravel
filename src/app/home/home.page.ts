import { CancellationPage } from './../user/cancellation/cancellation.page';
import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  dataReturned: any;
  // Params from callwash
  status: any = 0;
  // Get tid from user
  tid: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public navHttp: Http,
    public http: HttpClient,
    public modalController: ModalController) {

    // Receive params from callwash
    // this.route.queryParams.subscribe(params => {
    //   if (this.router.getCurrentNavigation().extras.state) {
    //     this.status = this.router.getCurrentNavigation().extras.state.status;
    //   }
    //   // console.log('Home',this.status);
    // });
  }



  ngAfterViewInit() {
    let url: string = "http://127.0.0.1:8000/api/checkStatus";
    let dataJson = new FormData();
    let data: Observable<any> = this.http.post(url, dataJson)
    data.subscribe(res => {
      if (res != null) {
        this.status = res.status[0].status;
        this.tid = res.status[0].tid;
      }
    });
  }

  async cancelCall() {
    const modal = await this.modalController.create({
      component: CancellationPage,
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
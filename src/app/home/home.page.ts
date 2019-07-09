import { CancellationPage } from './../user/cancellation/cancellation.page';
import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  status: any;
  // Get tid from user
  tid: any;

  // Param rating feedback table
  comment: string;
  rate: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public navHttp: Http,
    public http: HttpClient,
    public modalController: ModalController) {

  }

  // Show status on feed homepage where user_id
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

  // Rating
  onRateChange(event) {
    this.rate = event;
    console.log('Your rate:', this.rate);
  }

  // Update feedback table
  sendFeedBack() {
    let url: string = "http://127.0.0.1:8000/api/updateRating";
    let dataJson = new FormData();
    dataJson.append('tid', this.tid); // 
    dataJson.append('score', this.rate); // status
    dataJson.append('comment', this.comment); // status
    let data: Observable<any> = this.http.post(url, dataJson)
    data.subscribe(res => {
      if (res != null) {
        // console.log(res)
        let url: string = "http://127.0.0.1:8000/api/checkStatus";
        let dataJson = new FormData();
        let data: Observable<any> = this.http.post(url, dataJson)
        data.subscribe(res => {
          if (res != null) {

          }
        });
      }
    });
  }

  // Cancel order by User where status = 0
  async cancelCall() {
    // Open modal cancellation & send param tid
    const modal = await this.modalController.create({
      component: CancellationPage,
      componentProps: {
        "tid": this.tid
      },
      cssClass: 'cancelation-modal-css'
    });
    return await modal.present();
  }
}
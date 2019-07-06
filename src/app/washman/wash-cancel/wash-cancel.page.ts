import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-wash-cancel',
  templateUrl: './wash-cancel.page.html',
  styleUrls: ['./wash-cancel.page.scss'],
})
export class WashCancelPage implements OnInit {

  tid: any;
  comment: any;

  constructor(
    private nav: NavParams,
    private router: Router,
    public navHttp: Http,
    public http: HttpClient,
    public modalController: ModalController) { }

  ngOnInit() {
    this.tid = this.nav.data.tid
  }

  cancel() {
    this.modalController.dismiss();
  }

  confirm() {
    let url: string = "http://127.0.0.1:8000/api/cancelRequest";
    let dataJson = new FormData();
    dataJson.append('tid', this.tid); // check tid 
    // dataJson.append('status', 'C'); // update Status = C
    dataJson.append('cancellation', this.comment); // insert comment cancel to transaction
    let data: Observable<any> = this.http.post(url, dataJson)
    data.subscribe(res => {
      if (res != null) {
        console.log('Change status = C');
        this.router.navigateByUrl('washman/home');
      }
    });
    this.modalController.dismiss();
  }
}

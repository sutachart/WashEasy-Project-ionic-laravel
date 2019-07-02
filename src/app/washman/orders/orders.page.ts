import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage {

  public order = [];

  constructor(
    private router: Router,
    public modalController: ModalController,
    public navHttp: Http,
    public http: HttpClient) { }

  ngAfterViewInit() {
    let url: string = "http://127.0.0.1:8000/api/sendOrder";
    let dataJson = new FormData();
    let data: Observable<any> = this.http.post(url, dataJson)
    data.subscribe(res => {
      if (res != null) {
        this.order = res.status;
        console.log(res.status[0]);
      }
    });
  }

}

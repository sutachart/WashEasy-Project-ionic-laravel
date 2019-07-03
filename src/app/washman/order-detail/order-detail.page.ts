import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage {

  // Get param from orders
  tid: any;
  userid: any;
  tel: any;
  address: any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public navHttp: Http,
    public http: HttpClient) {

    // Receive params from order page
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.tid = this.router.getCurrentNavigation().extras.state.tid;
      }
    });
  }

  ngAfterViewInit(): void {

    let url: string = "http://127.0.0.1:8000/api/getDetail";
    let dataJson = new FormData();
    dataJson.append('tid', this.tid); // select * where tid = ?
    let data: Observable<any> = this.http.post(url, dataJson)
    data.subscribe(res => {
      if (res != null) {
        console.log(res);
        this.userid = res.status[0].user_id;
        this.tel = '0868750608';
        this.address = res.status[0].user_address;
      }
    });
  }

}

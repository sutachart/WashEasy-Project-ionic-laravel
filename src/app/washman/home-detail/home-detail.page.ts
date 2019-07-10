import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.page.html',
  styleUrls: ['./home-detail.page.scss'],
})
export class HomeDetailPage {

  tid: any;
  userid: any;
  tel: any;
  address: any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public navHttp: Http,
    public http: HttpClient,
    private alertController: AlertController) {

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
        // console.debug(res);
        this.userid = res.status[0].user_id;
        this.tel = '0868750608';
        this.address = res.status[0].user_address;
      }
    });
  }

  // Alert Order Accept
  async alertOrder() {
    const alert = await this.alertController.create({
      header: 'ยืนยันการส่งผ้า',
      // message:
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'confirm'
        },
        {
          text: 'ตกลง',
          role: 'confirm',
          handler: () => {
            let url: string = "http://127.0.0.1:8000/api/acceptRequest";
            let dataJson = new FormData();
            dataJson.append('tid', this.tid);
            let data: Observable<any> = this.http.post(url, dataJson)
            data.subscribe(res => {
              if (res != null) {
                console.log('Change status = 1');
                this.router.navigateByUrl('washman/home');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

}

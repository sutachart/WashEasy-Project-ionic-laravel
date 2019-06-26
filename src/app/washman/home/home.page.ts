import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {


  public orders = [
    { id: '0', name: 'Order1' },
    { id: '1', name: 'Order2' },
    { id: '2', name: 'Order3' }
  ]
  constructor(
    private alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute) { }

  async acceptOrder(orderId) {
    const alert = await this.alertController.create({
      header: 'ยืนยัน',
      // subHeader: 'Sub header',
      message: 'ยืนยันที่จะรับรายการ' + this.orders[orderId].name + '?',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel'
        },
        {
          text: 'ยืนยัน',
          role: 'confirm',
          handler: () => {

            // console.log("Confirm!");
            // let url: string = "http://localhost:8000/api/insertCallwash";
            // let dataJson = new FormData();
            // dataJson.append('serv_price', this.price); // total Price
            // dataJson.append('serv_choice', this.select); // total Choice
            // dataJson.append('serv_date', this.datetime); // date time

            // let data: Observable<any> = this.http.post(url, dataJson)
            // data.subscribe(res => {
            //   if (res != null)
            //     console.log(res);
            // });
            // this.router.navigateByUrl('/home');


          }
        }
      ]
    });
    await alert.present();
  }
}

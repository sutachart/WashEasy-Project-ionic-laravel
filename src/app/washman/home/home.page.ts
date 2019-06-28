import { CallwashPage } from './../../user/callwash/callwash.page';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  dataReturned: any;

  public orders = [
    { id: '0', name: 'Order1' },
    { id: '1', name: 'Order2' },
    { id: '2', name: 'Order3' }
  ]
  constructor(
    private alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute,
    public modalController: ModalController) { }

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

  async presentModal() {
    const modal = await this.modalController.create({
      component: CallwashPage,
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
}

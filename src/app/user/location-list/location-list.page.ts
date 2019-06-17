import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { PopoverController } from '@ionic/angular';
import { MoreLocationListComponent } from '../../more-location-list/more-location-list.component';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.page.html',
  styleUrls: ['./location-list.page.scss'],
})
export class LocationListPage implements OnInit {

  modalTitle:string;
  modelId:number;

  constructor(
     private modalController: ModalController,
    private navParams: NavParams,
    private popoverCtrl: PopoverController) { }

  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
  }

  async closeModal() {
    const onClosedData: string = "บ้านแมวเหมียว";
    await this.modalController.dismiss(onClosedData);
    console.log(onClosedData);
  }

  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
        component: MoreLocationListComponent,
        event: ev,
        animated: true,
        showBackdrop: true
    });
    return await popover.present();
}

  log(){
    console.log("click more.");
  }

}

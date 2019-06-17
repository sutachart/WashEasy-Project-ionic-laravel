import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

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
    private navParams: NavParams) { }

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

  log(){
    console.log("click more.");
  }

}

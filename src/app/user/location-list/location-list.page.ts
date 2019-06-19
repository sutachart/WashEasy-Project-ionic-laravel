import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { PopoverController } from '@ionic/angular';
import { MoreLocationListComponent } from '../../more-location-list/more-location-list.component';

import { Router } from '@angular/router';

import { DatabaseService, Dev } from './../../services/database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.page.html',
  styleUrls: ['./location-list.page.scss'],
})
export class LocationListPage implements OnInit {
  developers: Dev[] = [];

  products: Observable<any[]>;

  developer = {};
  product = {};

  s : any;

  selectedView = 'devs';
  // input data from modal
  // modalTitle: string;
  // modelId: number;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private popoverCtrl: PopoverController,
    private router: Router,
    private db: DatabaseService) { }

  ngOnInit() {
    console.table(this.navParams);
    // this.modelId = this.navParams.data.paramID;
    // this.modalTitle = this.navParams.data.paramTitle;
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getDevs().subscribe(devs => {
          this.developers = devs;
        })
        this.products = this.db.getProducts();
      }
    });
  }

  async closeModal(aId) {
    const id = aId-1;
    const onClosedData: string = 
    this.s = this.developers[id].locationName+", "
    +this.developers[id].roadName+", "
    +this.developers[id].floor_room+", "
    +this.developers[id].tel+", "
    +this.developers[id].locationDetail+", "
    +this.developers[id].gpsValue;
    await this.modalController.dismiss(onClosedData);
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

  addLocation() {
    this.router.navigateByUrl("/gps-map");
    this.modalController.dismiss();
  }

  addDeveloper() {
    this.db.addDeveloper(this.developer['locationName'], this.developer['roadName'], this.developer['floor_name'], this.developer['tel'], this.developer['locationDetail'], this.developer['gpsValue'])
      .then(_ => {
        this.developer = {};
      });
  }

  addProduct() {
    this.db.addProduct(this.product['name'], this.product['creator'])
      .then(_ => {
        this.product = {};
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

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

  selectedView = 'devs';
  // input data from modal
  // modalTitle: string;
  // modelId: number;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private popoverCtrl: PopoverController,
    private router: Router,
    private db: DatabaseService,
    public alertController: AlertController) { }

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

  async choose(aId) {
    // const del = this.db.getDeveloper(aId);
    // console.log(del[0].id);
    // const id = aId-1;
    // const onClosedData: string =
    //   this.developers[id].locationName + ", "
    //   + this.developers[id].roadName + ", "
    //   + this.developers[id].floor_room + ", "
    //   + this.developers[id].tel + ", "
    //   + this.developers[id].locationDetail + ", "
    //   + this.developers[id].gpsValue;
    console.log(aId);
    await this.modalController.dismiss(aId);
    // await this.modalController.dismiss(del[0].id);
  }

  // async notifications(ev: any) {
  //   const popover = await this.popoverCtrl.create({
  //     component: MoreLocationListComponent,
  //     event: ev,
  //     animated: true,
  //     showBackdrop: true
  //   });
  //   return await popover.present();
  // }

  addLoc() {
    this.router.navigateByUrl("/gps-map");
    this.modalController.dismiss();
  }

}
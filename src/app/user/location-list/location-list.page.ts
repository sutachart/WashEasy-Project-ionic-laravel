import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { PopoverController } from '@ionic/angular';
import { MoreLocationListComponent } from '../../more-location-list/more-location-list.component';

import { Router } from '@angular/router';

import { DatabaseService, Dev } from './../../services/database.service';
import { Observable } from 'rxjs';
import { promise } from 'protractor';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.page.html',
  styleUrls: ['./location-list.page.scss'],
})
export class LocationListPage implements OnInit {
  index: number = 0;
  loc: Dev = null;

  developers: Dev[] = [];

  products: Observable<any[]>;

  developer = {};

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
      }
    });
  }

  async choose(aId) {
    console.log("==============================");
    console.log("parameter: " + aId);
    this.db.getDeveloper(aId).then(data => {
      this.loc = data;
      console.log("Location name from function get " + this.loc.id);
      const dataReturn : string = 
      this.loc.locationName+", "
      +this.loc.roadName+", "
      +this.loc.floor_room+", "
      +this.loc.tel+", "
      +this.loc.locationDetail+", "
      +this.loc.gpsValue+", "
      this.modalController.dismiss(dataReturn);
    });
    // await this.modalController.dismiss(this.loc.id);
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
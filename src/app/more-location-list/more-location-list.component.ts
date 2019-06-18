import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-more-location-list',
  templateUrl: './more-location-list.component.html',
  styleUrls: ['./more-location-list.component.scss'],
})
export class MoreLocationListComponent implements OnInit {

  constructor(public alertController: AlertController) { }

  ngOnInit() {}

  edit(){
    console.log("edit clicked.");
  }

  delete(){
    console.log("delete clicked.");
  }

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      header: 'ต้องการลบ ... ?',
      // subHeader: 'Subtitle',
      // message: 'This is an alert message.',
      buttons: ['Cancel', 'Delete']
    });

    await alert.present();
  }


}

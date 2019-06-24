import { Component, OnInit } from '@angular/core';
import { DatabaseService, Dev } from './../../services/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ModalController, NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.page.html',
  styleUrls: ['./edit-location.page.scss'],
})
export class EditLocationPage implements OnInit {
  developer: Dev = null;
  skills = '';

  constructor(
    private route: ActivatedRoute,
    private db: DatabaseService,
    private router: Router,
    private toast: ToastController,
    private modalController: ModalController,
    public alertController: AlertController) {
    this.modalController.dismiss();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let devId = params.get('id');
      this.db.getDeveloper(devId).then(data => {
        this.developer = data;
      });
    });
  }

  delete() {
    this.db.deleteDeveloper(this.developer.id).then(() => {
      this.router.navigateByUrl('/');
    });
  }

  updateDeveloper() {
    this.db.updateDeveloper(this.developer).then(async (res) => {
      let toast = await this.toast.create({
        message: 'Location updated',
        duration: 3000
      });
      toast.present();
    });
  }

   async confirmDelete(aId) {
    const id = aId-1;
    const alert = await this.alertController.create({
      header: 'ต้องการลบ' + this.developer.locationName + "?",
      buttons: [{
        text: 'ยกเลิก',
        role: 'cancel'
      },
      {
        text: 'ลบ',
        role: 'confirm',
        handler: () => {
          this.db.deleteDeveloper(this.developer.id).then(() => {
            this.router.navigateByUrl('/callwash');
          });
         }
      }]
    });
  }
}

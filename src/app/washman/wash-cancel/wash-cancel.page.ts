import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-wash-cancel',
  templateUrl: './wash-cancel.page.html',
  styleUrls: ['./wash-cancel.page.scss'],
})
export class WashCancelPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

}

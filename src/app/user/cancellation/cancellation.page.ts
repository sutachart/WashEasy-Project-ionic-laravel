import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cancellation',
  templateUrl: './cancellation.page.html',
  styleUrls: ['./cancellation.page.scss'],
})
export class CancellationPage implements OnInit {

  constructor(private modalController : ModalController) { }

  ngOnInit() {
  }

  cancel(){
    this.modalController.dismiss();
  }

  confirm(){
    this.modalController.dismiss();
  }



}

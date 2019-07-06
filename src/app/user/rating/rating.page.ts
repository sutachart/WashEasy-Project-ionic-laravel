import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})
export class RatingPage implements OnInit {
  comment: string;
  rate: any;

  constructor() { }

  ngOnInit() {
  }

  onRateChange(event) {
    this.rate = event;

    console.log('Your rate:', this.rate);
  }

  sendFeedBack() {
    console.log(this.rate);
    console.log(this.comment);
  }

}

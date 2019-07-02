import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})
export class RatingPage implements OnInit {
  rate : any;
  constructor() { }

  ngOnInit() {
  }

  onRateChange(event) {
    console.log('Your rate:', event);
  }

}

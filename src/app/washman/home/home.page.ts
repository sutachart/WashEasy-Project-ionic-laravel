import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {


  public orders = [
    { id: '11' , name: 'Order1'},
    { id: '12' , name: 'Order2'},
    { id: '13' , name: 'Order3'}
  ]
  constructor() { }


}

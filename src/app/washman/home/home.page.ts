import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {


  public orders = [
    { id: '11' , name: 'testorder1'},
    { id: '12' , name: 'testorder2'}
  ]
  constructor() { }


}

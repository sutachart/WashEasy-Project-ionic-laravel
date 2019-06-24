import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gps-map',
  templateUrl: './gps-map.page.html',
  styleUrls: ['./gps-map.page.scss'],
})
export class GpsMapPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  addDetail(){
    this.router.navigateByUrl("/location-add-detail");
  }

}

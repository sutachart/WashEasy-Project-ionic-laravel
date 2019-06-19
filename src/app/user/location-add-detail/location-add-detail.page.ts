import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DatabaseService, Dev } from './../../services/database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-location-add-detail',
  templateUrl: './location-add-detail.page.html',
  styleUrls: ['./location-add-detail.page.scss'],
})
export class LocationAddDetailPage implements OnInit {
  developers: Dev[] = [];

  products: Observable<any[]>;

  developer = {};
  product = {};

  selectedView = 'devs';

  constructor(private db: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getDevs().subscribe(devs => {
          this.developers = devs;
        })
        this.products = this.db.getProducts();
      }
    });
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  cancel() {
    this.router.navigateByUrl("/callwash");
  }

  addDeveloper() {
    this.db.addDeveloper(this.developer['locationName'], this.developer['roadName'], this.developer['floor_room'], this.developer['tel'], this.developer['locationDetail'], this.developer['gpsValue'])
      .then(_ => {
        this.developer = {};
        this.router.navigateByUrl("/callwash");
      });
  }

  addProduct() {
    this.db.addProduct(this.product['name'], this.product['creator'])
      .then(_ => {
        this.product = {};
      });

  }

}

import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';


export interface Dev {
  id: number,
  locationName: string,
  roadName: string,
  floor_room: string,
  tel: string,
  locationDetail: string,
  gpsValue: string
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  developers = new BehaviorSubject([]);
  products = new BehaviorSubject([]);

  constructor(
    private plt: Platform,
    private sqlitePorter: SQLitePorter,
    private sqlite: SQLite,
    private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'developers.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
        });
    });
  }

  seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text' })
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(_ => {
            this.loadDevelopers();
            this.loadProducts();
            this.dbReady.next(true);
          })
          .catch(e => console.error(e));
      });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getDevs(): Observable<Dev[]> {
    return this.developers.asObservable();
  }

  getProducts(): Observable<any[]> {
    return this.products.asObservable();
  }

  loadDevelopers() {
    return this.database.executeSql('SELECT * FROM developer', []).then(data => {
      let developers: Dev[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          // let skills = [];
          // if (data.rows.item(i).skills != '') {
          //   skills = JSON.parse(data.rows.item(i).skills);
          // }
          developers.push({
            id: data.rows.item(i).id,
            locationName: data.rows.item(i).locationName,
            roadName: data.rows.item(i).roadName,
            floor_room: data.rows.item(i).floor_room,
            tel: data.rows.item(i).tel,
            locationDetail: data.rows.item(i).locationDetail,
            gpsValue: data.rows.item(i).gpsValue
          });
        }
      }
      this.developers.next(developers);
    });
  }

  addDeveloper(locationName, roadName, floor_room, tel, locationDetail, gpsValue) {
    let data = [locationName, roadName, floor_room, tel, locationDetail, gpsValue];
    return this.database.executeSql('INSERT INTO developer (locationName, roadName, floor_room, tel, locationDetail, gpsValue) VALUES (?, ?, ?, ?, ?, ?)', data).then(data => {
      this.loadDevelopers();
    });
  }

  getDeveloper(id): Promise<Dev> {
    return this.database.executeSql('SELECT * FROM developer WHERE id = ?', [id]).then(data => {
      // let skills = [];
      // if (data.rows.item(0).skills != '') {
      //   skills = JSON.parse(data.rows.item(0).skills);
      // }

      return {
        id: data.rows.item(0).id,
        locationName: data.rows.item(0).locationName,
        roadName: data.rows.item(0).roadName,
        floor_room: data.rows.item(0).floor_room,
        tel: data.rows.item(0).tel,
        locationDetail: data.rows.item(0).locationDetail,
        gpsValue: data.rows.item(0).gpsValue
      }
    });
  }

  deleteDeveloper(id) {
    return this.database.executeSql('DELETE FROM developer WHERE id = ?', [id]).then(_ => {
      this.loadDevelopers();
      this.loadProducts();
    });
  }

  updateDeveloper(dev: Dev) {
    let data = [dev.locationName, dev.roadName, dev.floor_room, dev.tel, dev.locationDetail, dev.gpsValue];
    return this.database.executeSql(`UPDATE developer SET locationName = ?, roadName = ?, floor_room = ?, tel = ?, locationDetail = ?, gpsValue = ? WHERE id = ${dev.id}`, data).then(data => {
      this.loadDevelopers();
    })
  }

  loadProducts() {
    let query = 'SELECT product.name, product.id, developer.name AS creator FROM product JOIN developer ON developer.id = product.creatorId';
    return this.database.executeSql(query, []).then(data => {
      let products = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          products.push({
            name: data.rows.item(i).name,
            id: data.rows.item(i).id,
            creator: data.rows.item(i).creator,
          });
        }
      }
      this.products.next(products);
    });
  }

  addProduct(name, creator) {
    let data = [name, creator];
    return this.database.executeSql('INSERT INTO product (name, creatorId) VALUES (?, ?)', data).then(data => {
      this.loadProducts();
    });
  }
}

import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {

  // Params from callwash
  status: any = 0;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public navHttp: Http,
    public http: HttpClient, ) {

    // Receive params from callwash
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.status = this.router.getCurrentNavigation().extras.state.status;
      }
      // console.log('Home',this.status);
    });
  }

  cancelCall() {
    this.status = null;
  }

  ngAfterViewInit() {
    let url: string = "http://127.0.0.1:8000/api/checkStatus";
    let dataJson = new FormData();

    let data: Observable<any> = this.http.post(url, dataJson)
    data.subscribe(res => {
      if (res != null) {
        // console.log('status form DB:', res.status[0].status);
        this.status = res.status[0].status;
        // console.log('Status:', this.status);
      }
    });
  }
}
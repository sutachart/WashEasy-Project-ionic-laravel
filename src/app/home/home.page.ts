import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // Params from callwash
  status: any;

  constructor(private router: Router, private route: ActivatedRoute) {

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
}

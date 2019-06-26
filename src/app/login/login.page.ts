import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  user: any = {};
  names: any;
  constructor(private router: Router, public navHttp: Http, public http: HttpClient) {

  }

  fnLogin() {
    console.log("user :", this.user.username);
    console.log("pass :", this.user.password);

    let url: string = "http://localhost:8000/api/loginUser";
    let dataJson = new FormData();
    dataJson.append('username', this.user.username);
    dataJson.append('password', this.user.password);


    let data: Observable<any> = this.http.post(url, dataJson)
    data.subscribe(res => {
      if (res != null)
        this.router.navigateByUrl('/home');
      console.log(res);
    });
  }
}

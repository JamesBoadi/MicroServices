import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { AuthService } from './pages/auth/services/auth.service'
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { catchError, tap, map, timeout } from 'rxjs/operators';
import * as moment from "moment";
import jwtDecode from 'jwt-decode';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  data: any;
  result: boolean;
  returnUrl: string;

  constructor(private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.data = "";
    this.result = false;
    this.returnUrl =
      this.activatedRoute.snapshot.queryParamMap.get('returnUrl') ||
      `/${ROUTER_UTILS.config.base.home}`;
  }

  rootURL = '/api';
  source: Observable<number> = new Observable<number>();

  registerUser(firstName: String, surname: String, userName: String,
    email: String, password: String) {

    let authorization = "none";
    const token = localStorage.getItem("user_token");
    if (token)
      authorization = token;

    const json = {
      firstName: firstName, surname: surname, userName: userName, email: email, password: password,
      authorization: authorization
    };

    const body = JSON.stringify(json);
    const headers = { 'content-type': 'application/json' }

    this.http.post('/identity/storeCredentials', body, { 'headers': headers }).subscribe({
      next: (data: any) => {
        setTimeout(() => {
          try {
            var decoded = jwtDecode(data[0].toString());
            var token = JSON.parse(JSON.stringify(decoded));

            const authResult = {
              id: token.id,
              exp: token.exp
            }

            this.createSession(authResult);
          
          } catch (error) {
            
          }
        }, 2000);

        alert('Registration successful');
        return;
      },
      error: (err: any) => {
        alert('Registration was not successful');
        return;
      }
    });
  }

  authenticateUser(email: string, password: string) {
    let authorization = "none"; let result = true;
    const token = localStorage.getItem("user_token");
    if (token)
      authorization = token;

    const json = { email: email, password: password, authorization: authorization };
    const body = JSON.stringify(json);
    const headers = { 'content-type': 'application/json' }

    this.http.post('/identity/checkCredentials', body, { 'headers': headers }).subscribe({
      next: (data: any) => {
        this.data = data[0];
        // httpintercepter for errors 
        setTimeout(() => {
          var decoded = jwtDecode(this.data.toString());
          var token = JSON.parse(JSON.stringify(decoded));

          const authResult = {
            id: token.id,
            exp: token.exp
          }

          this.createSession(authResult);

        }, 2000);

        return;
      },
      error: (err: any) => {
        alert("Your details were incorrect, please try again")
        return;
      }
    })
  }

  private createSession(authResult: any) {
    const expiresAt = moment().add(authResult.exp, 'milliseconds');
    localStorage.setItem('user_token', authResult.id);
    localStorage.setItem("token_expiry", JSON.stringify(expiresAt.valueOf()));
    this.checkTokenExpiry(expiresAt);

    alert('You have been signed in');
    this.authService.signIn();
    this.router.navigate([this.returnUrl]);
  }

  endSession() {
    localStorage.removeItem('user_token');
    localStorage.removeItem("token_expiry");
  }

  addUser(user: any, id: number) {
    user.id = id;
    return this.http.post(this.rootURL + '/user', user);
  }

  // Refresh Token?
  refreshToken(exp: any) {
    setTimeout(() => {
      alert('Your Session Has Expired');
      this.endSession();
      this.authService.signOut();
    }, exp);
  }

  // Has the token expired?
  checkTokenExpiry(exp: any) {
    setTimeout(() => {
      alert('Your Session Has Expired');
      this.endSession();
      this.authService.signOut();
    }, exp);
  }

}
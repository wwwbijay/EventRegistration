import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userProfile: BehaviorSubject<IUser> = new BehaviorSubject<IUser>({
    username: '',
    accessToken: '',
    tokenType: '',
    refreshToken: '',
    expiresIn: '',
    success: '',
    message: '',
    data: '',
    errors: '',
  });

  baseUrl: string = environment.baseUrl;
  jwthelper = new JwtHelperService();
  tokenExpired: Boolean = false;
  constructor(private http: HttpClient, private _router: Router) {}

  login(model: any): Observable<any> {
    return this.http.post(this.baseUrl + '/api/userauth/token', model);
  }

  isLoggedIn() {
    const user = this.loadFromLocalStorage();
    
    // if (this.jwthelper.isTokenExpired(user.accessToken)) {
    //   this.handleRefreshToken();
    //   const refreshedUser = this.loadFromLocalStorage();

    //   if (this.jwthelper.isTokenExpired(refreshedUser.accessToken)) {
    //     this.tokenExpired = true;
    //   } else {
    //     this.tokenExpired = false;
    //   }
    // } else {
    //   this.tokenExpired = false;
    // }
    // return !this.tokenExpired;
    return !this.jwthelper.isTokenExpired(user.accessToken);
  }
  

  GetAccessToken() {
    let user = this.loadFromLocalStorage();
    return user.accessToken;
  }

  // TO get refresh token while logging in with user name and password
  GetRefreshToken() {
    let user = this.loadFromLocalStorage();
    return user.refreshToken;
  }

  // To generate the refresh token
  GenerateRefreshToken(token:any) {
    let input = {
      grantType: 'refresh_token',
      source: 'web',
      refreshToken: token,
    };
    return this.http.post(this.baseUrl + '/api/userauth/token', input);
  }

  handleRefreshToken() {
    let token = this.GetRefreshToken();
    this.GenerateRefreshToken(token).subscribe({
      next: (data: any) => {
        let user = this.loadFromLocalStorage();
        user.accessToken = data.accessToken;
        user.refreshToken = data.refreshToken;
        this.saveToLocalStorage(user);
      },
      error: (err:any) => {
        console.log(err);
        this.logout();
      },
    });
  }

  saveToLocalStorage(user: IUser) {
    this.userProfile.next(user);
    localStorage.setItem('प्रशासकप्रोफाइल', JSON.stringify(user));
  }

  loadFromLocalStorage(): IUser {
    if (!this.userProfile.value.accessToken) {
      let fromLocalStorage = localStorage.getItem('प्रशासकप्रोफाइल');
      if (!!fromLocalStorage) {
        let userInfo = JSON.parse(fromLocalStorage);
        this.userProfile.next(userInfo);
      }
    }
    return this.userProfile.value;
  }

  logout() {
    localStorage.clear();
    this.userProfile.next({
      username: '',
      accessToken: '',
      tokenType: '',
      refreshToken: '',
      expiresIn: '',
      success: '',
      message: '',
      data: '',
      errors: '',
    });
    this._router.navigate(['/login']);

  }
}

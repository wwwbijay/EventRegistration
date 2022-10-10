import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _http: HttpClient
  ) {}
  
  canActivate() {
    
    if(!this._auth.isLoggedIn()){
      this._router.navigate(['/login']);
      return false;
    }
    return true;
  }  
}

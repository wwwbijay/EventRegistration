import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const myPayAPIUrl = environment.myPayAPIUrl;

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  headers = new HttpHeaders({
    API_KEY: 'ddOInxZbDO3OkH3fS9n7IIxywU94U1vPU25GeihGNaJN/gT6sBw4zXcknEFVRi0R',
    Accept: '*/*'
  });
  options = { headers: this.headers };

  constructor(private http: HttpClient) { }

  useMyPayPayment(data:any): Observable<any> {
    return this.http.post(myPayAPIUrl + '/api/use-mypay-payments', data, this.options);
  }


}

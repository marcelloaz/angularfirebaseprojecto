import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { OrderRequest } from '../model/wirecard/request/OrderRequest';


@Injectable({
  providedIn: 'root'
})
export class OrderRequestService {

  constructor(private httpClient: HttpClient, private _authService: AuthService) { }

  addProject(orderRequest: OrderRequest): Observable<OrderRequest> {
    return this.httpClient.post<OrderRequest>("" + 'Projects', orderRequest);
  }
}

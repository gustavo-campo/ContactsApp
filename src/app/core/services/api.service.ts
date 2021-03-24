import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //metodos base para el servicio de datos
  get(url: string, params: HttpParams = new HttpParams()) {
    return this.http.get(url, { params });
  }

  post(url: string, body: any, params: HttpParams = new HttpParams()) {
    return this.http.post(url, body, {params});
  }

  update(url: string, body: any, params: HttpParams = new HttpParams()) {
    return this.http.put(url, body, {params});
  }

  delete(url: string, params: HttpParams = new HttpParams()) {
    return this.http.delete(url, {params});
  }

}

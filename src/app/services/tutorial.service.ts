import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getAll(params): Observable<any> {
    console.log(params)
    return this.http.get(baseUrl, { params });
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
}

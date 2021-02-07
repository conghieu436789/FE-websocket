import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/user'

  constructor(
    private http: HttpClient
  ) { }
  getAllFriends(username: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${username}/friend`)
  }
  getUser(username: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${username}`)
  }
}

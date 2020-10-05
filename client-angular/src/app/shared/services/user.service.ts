import { APIRespone } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:3000/auth';

  constructor(
    private http: HttpClient
  ) { }

  login(credential: {
    gmail: string,
    password: string
  }){
    return this.http.post<APIRespone>(`${this.url}/login`, credential).pipe(
      map( result => {
      if (result.data !== null) {
        return true;
      } else {
        return result.message as string;
      }
    }))
  }
}

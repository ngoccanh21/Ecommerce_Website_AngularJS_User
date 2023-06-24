import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  login(data:any){
    return this.http.post<any>('http://localhost:18058/api/Login/login',data)
    .pipe(map((res: any) => {
      return res;
    }))
  }
}

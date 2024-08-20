import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment as env } from 'src/environments/environment.development';
import { NewUser } from '../models/usuario.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseURL: String = env.baseURL
  private readonly baseURL2: String = env.baseURL2
  private tokenHeader: string = this.cookieService.get('token');
  private userLogged: string = this.cookieService.get('user');
  private Header = new HttpHeaders({
    Authorization: `Bearer ${this.tokenHeader}`
  })

  constructor( private httpLogin: HttpClient,
               private cookieService: CookieService ) { }

  login(usuario:{ email: String, password: String}): Observable<any>{
    return this.httpLogin.post<any>(`${this.baseURL}/auth/login`,usuario);
  }

  postAndaWbServ(user: {password: string, username: string}): Observable<any>{
    return this.httpLogin.post<any>(`${this.baseURL2}/authenticate`, user);
  }

  getDashBoardInfo(): Observable<any>{
    console.log(this.tokenHeader, this.userLogged);

    return this.httpLogin.get<any>(`${this.baseURL2}/api/dashboard/getDashboardInfo/${this.userLogged}`,{headers: this.Header})
  }

  register( newUser: NewUser ): Observable<any>{
    return this.httpLogin.post<any>(`${this.baseURL}/auth/registro`,newUser);
  }

  getUserNameById( id: String ): Observable<any>{
    console.log(id);

    return this.httpLogin.get<any>(`${this.baseURL}/usuario/${id}`)
  }
}

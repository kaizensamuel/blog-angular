import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';
@Injectable()
export class UserService{
    public url: string;
    constructor(
        public _http: HttpClient
    ){
        this.url = global.url_api;
    }
    test(){
        return "hola mundo service";
    }
    register (user): Observable<any> {
        return this.envioPost('register',user);
    }
    signup(user, getTokens = null): Observable<any>{
        if(getTokens == null){
            user.getTokens = 'true';
        }
        return this.envioPost('login',user);
    }
    envioPost(ruta, user){
        let json= JSON.stringify(user);
        let params ='json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post<Observable<any>>(this.url+ruta, params, {headers: headers});
    }
}


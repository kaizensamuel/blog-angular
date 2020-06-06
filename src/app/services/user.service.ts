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
        let json= JSON.stringify(user);
        let params ='json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        console.log(params);
        return this._http.post<Observable<any>>(this.url+'register', params, {headers: headers});
    }
}


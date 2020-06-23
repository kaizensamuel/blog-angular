import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';
@Injectable()
export class UserService{
    public url: string;
    public identity;
    public token;
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
        
        if(getTokens != null){
            user.getTokens = true;
        }
        return this.envioPost('login',user);
    }
    update(token, user): Observable<any>{
        let json= JSON.stringify(user);
        let params ='json='+json; 
       
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization',String(token))
            .set('Access-Control-Allow-Methods', 'PUT') 
            .set('Access-Control-Allow-Origin', '*');
        return this._http.put(this.url+'user/update', params, {headers: headers});
    }
    envioPost(ruta, user): Observable<any>{
        let json= JSON.stringify(user);
        let params ='json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post<Observable<any>>(this.url+ruta, params, {headers: headers});
    }
    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));
        if(identity && identity != "undefined"){
            this.identity=identity;
        } else {
            this.identity = null;
        }
        return this.identity;

    }
    getToken(){
        let token = (localStorage.getItem('token'));
        if(token && token != "undefined"){
            this.token=token;
        } else {
            this.token = null;
        }
        return this.token;
    }
}


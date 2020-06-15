import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck{
  title = 'blog-angular';
  public identity;
  public token;
  constructor(
    public _userService:UserService
  ) {
    this.loadUser();
    
  }
  ngDoCheck(): void {
    this.loadUser();
  }
  ngOnInit(): void {
    
  }
  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
}

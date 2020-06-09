import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status:string;
  public token;
  public identity;

  constructor(
    public _userService:UserService
  ) {
    this.page_title = "Identificate";
    this.user= new User(1,'','','ROLE_USER','','','','');
   }

  ngOnInit(): void {
  }
  onSubmit(form){
    this._userService.signup(this.user,null).subscribe(
      response => {
        if(response.s == "success"){
          this.status = response.status;
          this.token = response;
          this._userService.signup(this.user,true).subscribe(
            response => {
              this.identity = response;
               
            },
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
          );
          form.reset();
        } else {
          this.status = 'error';
        }
         
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
    console.log(this.user);
  }

}

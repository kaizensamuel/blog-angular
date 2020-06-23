import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;
  public identity;
  public token;

  constructor(
    public _userService: UserService
  ) {
    this.page_title = "Ajustes";
    
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    //this.user = this.identity;
    this.user= new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email,
      '',this.identity.description,
      this.identity.image);
   
  }

  ngOnInit(): void {
  }
  onSubmit(form){
    //console.log(this.user);
    this._userService.update(this.token, this.user).subscribe(
      response => {
        console.log(response);
      },
      error => {
       // console.log(<any>error);
      }
    );
  }
  

}

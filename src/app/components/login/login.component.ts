import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
    private _userService:UserService,
    private _router:Router,
    private _activatedRoute:ActivatedRoute
  ) {
    this.page_title = "Identificate";
    this.user= new User(1,'','','ROLE_USER','','','','');
   }

  ngOnInit(): void {
    // Se ejecuta siempre y cierra sesion cuando le llea el parametro sure
    this.logout();

  }
  onSubmit(form){
    this._userService.signup(this.user).subscribe(
      response => {
        if(response.status != 'error'){
          this.status = response.status;
          this.token = response;
      
          this._userService.signup(this.user, true).subscribe(
            responseIdentity => {
              this.identity = responseIdentity;

              // PERSISTIR USUARIO
             
              localStorage.setItem('token',this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));
              
            },
            error => {
              this.status = 'error';
              
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
    //console.log(this.user);
  }
  logout(){
    this._activatedRoute.params.subscribe(params => {
        let logout = +params['sure'];
        if(logout == 1){
          localStorage.removeItem('identity');
          localStorage.removeItem('token');

          this.identity = null;
          this.token = null;

          // Redireccion a inicio

          this._router.navigate(['inicio']);

        }
    })
  }

}

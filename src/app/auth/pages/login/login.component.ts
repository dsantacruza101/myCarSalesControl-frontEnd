import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { AuthService } from '../../../../Services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public login: FormGroup;
  public user = {
    password: '123',
    username: 'mauricio.tecnico'
  }



  constructor(
    private router: Router,
    private CookieService: CookieService,
    private fb: FormBuilder,
    private loginService: AuthService )
  {
    this.login = this.fb.group({
      email: ['', [ Validators.required,Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  handleSignUp() {

    console.log('funcionando');

    console.log(this.login.value);

    this.loginService.login(this.login.value).subscribe({
      next: (response) => {
        console.log(response);

        const test = {
          email: response.user.user.email,
          name: response.user.user.firstName,
          token: response.user.token,
          id: response.user.user._id
        }
        console.log(test);
        this.CookieService.set( 'user', JSON.stringify(test), 24, '/');
        this.router.navigate([ 'home-page' ])
      },
      error:(err) => {
        console.log(err);

      },
      // complete:()=>{
      //   this.andaEndPoint();
      // }

    })


  }

  andaEndPoint() {

    this.loginService.postAndaWbServ(this.user).subscribe({
      next: ( res )  => {
        console.log(res.access_token, res.user);
        this.CookieService.set('token', res.access_token, 24, '/');
        this.CookieService.set('user', res.user, 24, '/');

      },
      error: ( err ) => {
        console.log( err );

      }
    })

  }

}

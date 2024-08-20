import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from 'src/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  public registro: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: AuthService,
    private route: Router) {
      this.registro = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName:  ['', [Validators.required]],
        email:     ['', [Validators.required, Validators.email]],
        password:  ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      },{ validator: this.checkPassword} );

    }


    checkPassword(group: FormGroup): object | null {
      const password = group.controls['password'].value;
      const confirmPassword = group.controls['confirmPassword'].value;

      console.log(password === confirmPassword ? null : { notSame: true }  );

      return password === confirmPassword ? null : { notSame: true }
    }

    handleRegister() {

      const { firstName, lastName, email, password} = this.registro.value;

      let newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }

      this.registerService.register(newUser).subscribe({
        next: (response) => {
          console.log(response);
          this.route.navigate(['/auth/login']);
        },
        error:(err) => {
          console.log(err);

        }
      });



    }

}

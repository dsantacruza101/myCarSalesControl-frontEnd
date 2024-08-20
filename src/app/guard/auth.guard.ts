import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

export const authGuard = () => {
  const cookie = inject(CookieService);
  const router = inject(Router);
  const usuario = JSON.parse(cookie.get('user') || '{}' ) ;

  if ( usuario.token ) {
    return true
  }else {
    console.log('no existe token');
    router.navigate([
      'auth/login'
    ])
    return false
  }
};

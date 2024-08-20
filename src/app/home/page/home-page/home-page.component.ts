import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router'
import { AuthService } from '../../../../Services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { TipoCompraComponent } from '../../components/tipo-compra/tipo-compra.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  public showFiller:boolean = false;
  public usuario: any;
  public userName: string = '';
  public datosDashboard: any = {};


  constructor(
    private cookie: CookieService,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.usuario = JSON.parse(this.cookie.get('user'));
    console.log(this.usuario);

    // if(!this.usuario){
    //   this.router.navigate([ 'auth/login' ]);
    // }

    // this.obtenerUsuario();
    // this.getDashboardInfo();
  }



  logOut() {
    this.cookie.delete('user');
    this.router.navigate([ 'auth/login' ]);
  }

  obtenerUsuario() {

    this.authService.getUserNameById(this.usuario.id).subscribe({
      next: ( res ) => {
        console.log(res);

        this.userName = res.usuario.firstName

      },
      error: ( err ) => {
        console.log(err);

      }
    })
  }

  getDashboardInfo(){
    this.authService.getDashBoardInfo().subscribe({
      next: ( res ) => {
        console.log(res);
        this.datosDashboard = res;
      },
      error: ( err ) => {
        console.log(err);

      }
    })
  }


    openModalSelect() {
    const dialogRef = this.dialog.open(TipoCompraComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}




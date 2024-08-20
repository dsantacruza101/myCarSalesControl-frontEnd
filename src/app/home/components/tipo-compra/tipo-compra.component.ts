import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistroAuto1Component } from '../registroAuto1/registro-auto1.component';


@Component({
  selector: 'app-tipo-compra',
  templateUrl: './tipo-compra.component.html',
  styleUrls: ['./tipo-compra.component.css']
})



export class TipoCompraComponent {

  constructor(     public dialog: MatDialog ){}

  openModalCar1Form() {



    const dialogRef = this.dialog.open(RegistroAuto1Component, {

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}



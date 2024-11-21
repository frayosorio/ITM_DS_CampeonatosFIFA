import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { Seleccion } from '../../../core/dominio/seleccion';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DatosEdicionSeleccion {
  encabezado: string;
  seleccion: Seleccion;
}

@Component({
  selector: 'app-seleccion-editar',
  standalone: true,
  imports: [
    FormsModule,
    ReferenciasMaterialModule
  ],
  templateUrl: './seleccion-editar.component.html',
  styleUrl: './seleccion-editar.component.css'
})
export class SeleccionEditarComponent {

  constructor(public dialogRef: MatDialogRef<SeleccionEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: DatosEdicionSeleccion
  ) {

  }

  public cerrar() {
    this.dialogRef.close();
  }

}

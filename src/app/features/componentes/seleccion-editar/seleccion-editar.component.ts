import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { Seleccion } from '../../../core/entidades/Seleccion';
import { FormsModule } from '@angular/forms';

export interface DatosEdicionSeleccion {
  encabezado: string;
  seleccion: Seleccion;
}

@Component({
  selector: 'app-seleccion-editar',
  standalone: true,
  imports: [
    ReferenciasMaterialModule,
    FormsModule
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

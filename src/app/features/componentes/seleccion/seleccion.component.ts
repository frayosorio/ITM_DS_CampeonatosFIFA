import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { Seleccion } from '../../../core/entidades/Seleccion';
import { SeleccionService } from '../../servicios/seleccion.service';
import { MatDialog } from '@angular/material/dialog';
import { SeleccionEditarComponent } from '../seleccion-editar/seleccion-editar.component';
import { DecidirComponent } from '../../../shared/componentes/decidir/decidir.component';

@Component({
  selector: 'app-seleccion',
  standalone: true,
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgxDatatableModule
  ],
  templateUrl: './seleccion.component.html',
  styleUrl: './seleccion.component.css'
})
export class SeleccionComponent {

  public textoBusqueda: string = "";
  public selecciones: Seleccion[] = [];
  public columnas = [
    { name: "Selección de Fútbol", prop: "nombre" },
    { name: "Entidad gestora", prop: "entidad" }
  ]
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;
  private seleccionEscogida: Seleccion | undefined;

  constructor(private servicio: SeleccionService,
    private servicioDialogo: MatDialog
  ) {
    this.listar();
  }

  escoger(event: any) {
    if (event.type == "click") {
      this.seleccionEscogida = event.row;
    }
  }

  listar() {
    this.servicio.listar().subscribe({
      next: response => {
        this.selecciones = response;
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }

  buscar() {

  }

  agregar() {
    this.servicioDialogo.open(SeleccionEditarComponent, {
      width: "400px",
      height: "300px",
      disableClose: true,
      data: {
        encabezado: "Agregando nueva Selección de Fútbol",
        seleccion: {
          id: 0,
          nombre: "",
          entidad: ""
        }
      }
    });
  }

  modificar() {
    if (this.seleccionEscogida) {
      this.servicioDialogo.open(SeleccionEditarComponent, {
        width: "400px",
        height: "300px",
        disableClose: true,
        data: {
          encabezado: `Editando Selección de Fútbol [${this.seleccionEscogida.nombre}]`,
          seleccion: this.seleccionEscogida
        }
      });
    }
    else {
      window.alert("Debe escoger una Selección de la lista");
    }
  }
  verificarEliminar() {
    if (this.seleccionEscogida) {
      this.servicioDialogo.open(DecidirComponent, {
        width: "300px",
        height: "200px",
        disableClose: true,
        data: {
          encabezado: `Está seguro de eliminar la Selección de Fútbol [${this.seleccionEscogida.nombre}]?`,
          id: this.seleccionEscogida.id
        }
      });
    }
    else {
      window.alert("Debe escoger una Selección de la lista");
    }
  }
}

import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { Seleccion } from '../../../core/dominio/seleccion';
import { SeleccionService } from '../../servicios/seleccion.service';
import { MatDialog } from '@angular/material/dialog';
import { SeleccionEditarComponent } from '../seleccion-editar/seleccion-editar.component';

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
  public seleccionEscogida: Seleccion | undefined;


  constructor(private seleccionServicio: SeleccionService,
    private servicioDialogo: MatDialog
  ) {
    this.listar();
  }

  public listar() {
    this.seleccionServicio.listar().subscribe({
      next: respuesta => {
        this.selecciones = respuesta;
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }

  public escoger(event: any) {
    if (event.type == "click") {
      this.seleccionEscogida = event.row;
    }
  }

  public buscar() {
    if (this.textoBusqueda.length > 0) {
      this.seleccionServicio.buscar(this.textoBusqueda).subscribe({
        next: response => {
          this.selecciones = response;
        },
        error: error => {
          window.alert(error.message);
        }
      });
    }
    else {
      this.listar();
    }
  }

  public agregar() {
    const dialogo = this.servicioDialogo.open(SeleccionEditarComponent, {
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

    dialogo.afterClosed().subscribe({
      next: data => {
        if (data) {
          this.seleccionServicio.agregar(data.seleccion).subscribe({
            next: respuesta => {
              this.seleccionServicio.buscar(data.seleccion.nombre).subscribe({
                next: response => {
                  this.selecciones = response;
                  window.alert("la selección fue agregada");
                },
                error: error => {
                  window.alert(error.message);
                }
              });
            },
            error: error => {
              window.alert(error.message);
            }
          });
        }
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }

  public modificar() {
    if (this.seleccionEscogida) {
      const dialogo = this.servicioDialogo.open(SeleccionEditarComponent, {
        width: "400px",
        height: "300px",
        disableClose: true,
        data: {
          encabezado: `Modificando la seleccion ${this.seleccionEscogida.nombre}`,
          seleccion: this.seleccionEscogida
        }
      });

      dialogo.afterClosed().subscribe({
        next: data => {
          if (data) {
            this.seleccionServicio.modificar(data.seleccion).subscribe({
              next: respuesta => {
                
              },
              error: error => {
                window.alert(error.message);
              }
            });
          }
        },
        error: error => {
          window.alert(error.message);
        }
      });
    }
    else {
      window.alert("Debe escoger la selección");
    }
  }

  public verificarEliminar() {

  }

}

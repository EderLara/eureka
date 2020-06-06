import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
// Interfaces:
import { Usuarios } from '../../interfaces/usuarios'
// Servicios
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuariosService]
})
export class UsuariosComponent implements OnInit {

  // Variables del componente:
  public titulo: string;
  public page: number;
  public nextpage;
  public prevpage;
  public status: string;
  public finder: boolean;
  // Variables con los valores de la base de datos:
  public total;
  public pages;
  public users: Usuarios[];
  public dato;
  public userUdt;
  public id;
  public rfidUdt;
  public estaUpdt;
  public rfidLargo;
  // elemento para el filtro:
  resultUser = '';

  constructor(
    private _ruta : ActivatedRoute,
    private _rutero: Router,
    private _ServiceUser : UsuariosService
  ) {
    this.titulo = 'Gestión de Usuarios';
    this.finder = false;
   }

  ngOnInit() {
    console.log('Componente de usuarios TS está cargado');
    this.actualpage();
  }

  // Función para capturar el número de página:
  actualpage(){
    this._ruta.params.subscribe(params =>{
      // Con esta variable capturamos de la url una "pagina", lo convertimos en entero al pasarle el "+":
      this.page = +params['page'];

      if (!params['page']) {
        this.page = 1
      }

      if (!this.page) {
        this.page = 1
      }else{

        this.nextpage = this.page+1;
        this.prevpage = this.page-1;
        // Condicionamos para que no se carguen valores negativos:
        if (this.prevpage <= 0) {
          this.prevpage = 1;    // Con esto garantizamos que no hayan errores de paginación
        }
      }
      console.log(this.page);
      // Devolver el listado de usuarios:
      this.getUsers(this.page);
    });
  }
  // Función para traer todos los usuarios:
  getUsers(page){
    this._ServiceUser.getUsers(page).subscribe(
      res =>{
        if (!res.users) {
          this.status = 'error de respuesta';
        } else {
          this.total = res.total;
          this.pages = res.paginas;
          this.users = res.users;
          // Validamos la página con respecto a la pocision del path:
          if (page > this.pages) {
            // Si la pagina que ingreso es mayor a las que hay, me devuelve a la primera pag:
            this._rutero.navigate(['/usuarios',1]);
          }
          localStorage.setItem('Usuarios', JSON.stringify(this.users));
        }
      },
      error =>{
        var MsjError = <any>error;
        console.log(MsjError);

        if (MsjError != null) {
          this.status = 'error';
        }
      }
    );
  }

  // Función para adicionar RFID al usuarios:
  addRfid(UdtUser){
    this.userUdt = UdtUser;
    this.id = UdtUser._id;
  }

  onSubmit(actUser){
    console.log(actUser);
    this._ServiceUser.UpdateUser(this.id, actUser.value).subscribe(
      res=>{
      if (!res) {
        this.estaUpdt = "Error al actualizar el RFID del usuario";
        console.log(this.estaUpdt)
      }else{
        console.log(res.user);
      }
    },
    error=>{
        var MsjError = <any>error;
        console.log(MsjError);

        if (MsjError != null) {
          this.status = 'error';
          console.log(this.status);
        }
    })
   }

}

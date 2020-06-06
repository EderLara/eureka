import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
// Servicios
import { ZonaService } from '../../services/zona.service';

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.css']
})
export class ZonasComponent implements OnInit {

  public estado;
  public area;
  public zonas: any[];

  constructor(
    private serviceZona : ZonaService
  ) { }

  ngOnInit() {
    this.reportZonas();
  }

  reportZonas(){
    this.serviceZona.getZonas().subscribe(
      res=>{
        if(!res.coverZona){
          this.estado ="Error no se han cargado zonas"
        }else{
          this.zonas = res.coverZona;
          this.area = res.coverZona.zone;
          localStorage.setItem('Zonas', JSON.stringify(this.zonas));
          console.log(this.zonas);
        }
      },
      error =>{
        var MsjError = <any>error;
        console.log(MsjError);

        if (MsjError != null) {
          this.estado = 'error';
        }
      }
    );
  }

}

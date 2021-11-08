import { Component, OnInit } from '@angular/core';
import {ServicioApiSoccerService } from './servicio-api-soccer.service';

class Equipo{
  posicion = 0;
  logo: String = "";
  equipo_nombre: String = "";
  puntos = 0;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  infoTabla: any;
  arrayEquipos: Array<Equipo> = [];

  constructor(private service: ServicioApiSoccerService) { 

    for(let i =0; i<18; i++){
      this.arrayEquipos[i] = new Equipo();
    }

  }

  
  ngOnInit(): void {
    this.service.getTablaGeneral().subscribe(data => {
      this.infoTabla = data;
      
      for (let i=0; i < 18; i++) {
        this.arrayEquipos[i].posicion = data.response[0].league.standings[0][i].rank;
        this.arrayEquipos[i].logo = data.response[0].league.standings[0][i].team.logo;
        this.arrayEquipos[i].equipo_nombre = data.response[0].league.standings[0][i].team.name;
        this.arrayEquipos[i].puntos = data.response[0].league.standings[0][i].points;
      }

      console.log(data);
    });
  }


}

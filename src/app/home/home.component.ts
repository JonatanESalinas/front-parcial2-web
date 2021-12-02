import { Component, OnInit } from '@angular/core';
import {ServicioApiSoccerService } from './servicio-api-soccer.service';
////import { DataService } from '../data.service';
////import { GraphqlProductsService} from '../graphql.products.service';
import { Subscription } from 'rxjs';
import { GraphqlUsersService} from '../graphql.users.service';

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

  imagen1 : string = ""
  imagen2 : string = ""
  imagen3 : string = ""

  user: string = ""
  userLogeado: string = ""
  pass: string = ""
  token: string = ""

  constructor(private service: ServicioApiSoccerService, private graphqlUsersService : GraphqlUsersService) { 

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
    this.carga_galeria();
  }
  carga_galeria(){
    this.graphqlUsersService.queryImages().subscribe(({ data })=>{
      
      this.imagen1 = JSON.parse(JSON.stringify(data)).images[0].url;
      this.imagen2 = JSON.parse(JSON.stringify(data)).images[1].url;
      this.imagen3 = JSON.parse(JSON.stringify(data)).images[2].url;
      //var images1 = images.data.url;
      console.log(this.imagen1);
      console.log(this.imagen2);
      console.log(this.imagen3);
    });
  }
  loginUser() {

    //alert(this.user + " - " + this.pass);
    this.graphqlUsersService.tokenAuth(this.user, this.pass)
    .subscribe(({ data }) => {
       console.log('logged: ', JSON.stringify(data));
      // this.storageService.setSession("token", JSON.parse(JSON.stringify(data)).tokenAuth.token);
      //this.storageService.setLocal("token", JSON.parse(JSON.stringify(data)).tokenAuth.token);
      this.token =  JSON.parse(JSON.stringify(data)).tokenAuth.token;
      
      this.userLogeado = this.user;
      //this.loginService.showData(mydata);
      // this.router.navigate(['/']);

    }, (error) => {
       console.log('there was an error sending the query', error);
    });
  
  }  
}

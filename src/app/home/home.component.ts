import { Component, OnInit } from '@angular/core';
import {ServicioApiSoccerService } from './servicio-api-soccer.service';
////import { DataService } from '../data.service';
////import { GraphqlProductsService} from '../graphql.products.service';
import { Subscription } from 'rxjs';
import { GraphqlUsersService} from '../graphql.users.service';
import { JsonpClientBackend } from '@angular/common/http';

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
  equipoFavorito: string = ""

  miEquipo: string = ""
  suLogo: string = ""

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

      this.token =  JSON.parse(JSON.stringify(data)).tokenAuth.token;
      
      this.userLogeado = this.user;

      this.personaliza_de_acuerdo_a_equipo();

    }, (error) => {
       console.log('there was an error sending the query', error);
    });
  
  }  

  personaliza_de_acuerdo_a_equipo(){

    this.graphqlUsersService.queryEquipoFav()
    .subscribe(({ data }) => {
      console.log('Lista: ', JSON.stringify(data));

      var longi = JSON.parse(JSON.stringify(data)).votes.length;
      console.log("longi es: " + longi)
      var flag = true;
      var i = longi - 1;
      while(flag){
          console.log("i vale: " + i);
          if(JSON.parse(JSON.stringify(data)).votes[i].user.username == this.userLogeado){
            console.log("ando en el if")
              flag=false;
              this.equipoFavorito = JSON.parse(JSON.stringify(data)).votes[i].link.description;
          }
          i--;
      }
      console.log(this.userLogeado + " le va al " + this.equipoFavorito);

      this.personaliza_mas();
      

   }, (error) => {
      console.log('there was an error sending the query', error);
   });
  }

  personaliza_mas(){
    var valor = "";
    if(this.equipoFavorito == "America"){
      valor = "2287"
    }
    else if(this.equipoFavorito == "Atlas"){
      valor = "2283"
    }
    else if(this.equipoFavorito == "Tigres"){
      valor = "2279"
    }
    else if(this.equipoFavorito == "Santos"){
      valor = "2285"
    }
    else if(this.equipoFavorito == "Toluca"){
      valor = "2281"
    }
    else if(this.equipoFavorito == "Leon"){
      valor = "2289"
    }
    else if(this.equipoFavorito == "Puebla"){
      valor = "2291"
    }
    else if(this.equipoFavorito == "Cruz Azul"){
      valor = "2295"
    }
    else if(this.equipoFavorito == "Monterrey"){
      valor = "2282"
    }
    else if(this.equipoFavorito == "Chivas"){
      valor = "2278"
    }
    else if(this.equipoFavorito == "Pumas"){
      valor = "2286"
    }
    else if(this.equipoFavorito == "Atletico de San Luis"){
      valor = "2314"
    }
    else if(this.equipoFavorito == "Mazatlan"){
      valor = "14002"
    }
    else if(this.equipoFavorito == "Necaxa"){
      valor = "2288"
    }
    else if(this.equipoFavorito == "Pachuca"){
      valor = "2292"
    }
    else if(this.equipoFavorito == "FC Juarez"){
      valor = "2298"
    }
    else if(this.equipoFavorito == "Club Queretaro"){
      valor = "2290"
    }
    else if(this.equipoFavorito == "Tijuana"){
      valor = "2280"
    }

    this.service.getMyInfo(valor).subscribe(data => {
     //console.log(data);
     this.miEquipo = data.response[0].team.name;
     this.suLogo = data.response[0].team.logo;
      //console.log("Unos datos: " + data.response[0].team.name);

      /*for (let i=0; i < 18; i++) {
        this.arrayEquipos[i].posicion = data.response[0].league.standings[0][i].rank;
        this.arrayEquipos[i].logo = data.response[0].league.standings[0][i].team.logo;
        this.arrayEquipos[i].equipo_nombre = data.response[0].league.standings[0][i].team.name;
        this.arrayEquipos[i].puntos = data.response[0].league.standings[0][i].points;
      }*/

    });    

  }

}

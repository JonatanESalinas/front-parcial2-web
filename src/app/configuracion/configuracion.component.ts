import { Component, OnInit } from '@angular/core';
import { GraphqlUsersService} from '../graphql.users.service'; 

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  equipoSeleccionado: any;

  constructor(private graphqlUsersService : GraphqlUsersService) { }

  ngOnInit(): void {
  }

  selectTeam(){
    //console.log(this.equipoSeleccionado);
    
    this.graphqlUsersService.createVote(this.equipoSeleccionado)
    .subscribe(({ data }) => {
       console.log('equisde: ', JSON.stringify(data));
      // this.storageService.setSession("token", JSON.parse(JSON.stringify(data)).tokenAuth.token);
      //this.storageService.setLocal("token", JSON.parse(JSON.stringify(data)).tokenAuth.token);
      //this.token =  JSON.parse(JSON.stringify(data)).tokenAuth.token;
      
      //this.userLogeado = this.user;
      //this.loginService.showData(mydata);
      // this.router.navigate(['/']);

    }, (error) => {
       console.log('there was an error sending the query', error);
    });   
  }

}

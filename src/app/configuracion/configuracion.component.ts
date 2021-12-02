import { Component, OnInit } from '@angular/core';
import { GraphqlUsersService} from '../graphql.users.service'; 

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  equipoSeleccionado: any;

  user: string = ""
  userLogeado: string = ""
  pass: string = ""
  token: string = ""

  constructor(private graphqlUsersService : GraphqlUsersService) { }

  ngOnInit(): void {
  }

  selectTeam(){
    //console.log(this.equipoSeleccionado);
  
    this.graphqlUsersService.createVote(this.equipoSeleccionado, "JWT " + this.token)
    .subscribe(({ data }) => {
       console.log('equisde: ', JSON.stringify(data));



    }, (error) => {
       console.log('there was an error sending the query', error);
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

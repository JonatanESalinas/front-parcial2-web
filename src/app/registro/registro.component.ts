import { Component, OnInit } from '@angular/core';
import { GraphqlUsersService} from '../graphql.users.service';
import { Input, EventEmitter, Output, forwardRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  user: string = ""
  pass: string = ""
  pass_repite: string = ""
  mail: string = ""
  token: string = ""
  @Input() isChecked = false;

  constructor(private graphqlUsersService : GraphqlUsersService) { }

  ngOnInit(): void {
  }

  createNewUser() {
    //console.log(this.isChecked);
    
    if((this.pass == this.pass_repite) && (this.isChecked == true)){
      console.log("Registrando. User: " + this.user + " Password: " + this.pass + " Mail: " + this.mail);
      this.graphqlUsersService.createUser(this.user, this.mail, this.pass)
      .subscribe(({ data }) => {
        console.log('logged: ', JSON.stringify(data));

        alert("Gracias por registrarte " + this.user + ". Ahora loggeate en Home.");
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
    }


  
  }  

}

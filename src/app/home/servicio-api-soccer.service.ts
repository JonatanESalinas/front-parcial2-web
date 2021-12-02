import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicioApiSoccerService {

  constructor(private http: HttpClient) { }

  getTablaGeneral(): Observable<any>{
    return this.http.get('https://v3.football.api-sports.io/standings?league=262&season=2021',{
      headers:{
        "x-rapidapi-key": "bcbd77270a6645ba3c5711b738a584c5",
        "x-rapidapi-host": "v3.football.api-sports.io"
      },
    });
  }

  getMyInfo(identif: string): Observable<any>{
    return this.http.get('https://v3.football.api-sports.io/teams?id=' + identif,{
      headers:{
        "x-rapidapi-key": "bcbd77270a6645ba3c5711b738a584c5",
        "x-rapidapi-host": "v3.football.api-sports.io"
      },
    });
  }
}

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
        "x-rapidapi-key": "54d73f30696201875491a2f00dae6602",
        "x-rapidapi-host": "v3.football.api-sports.io"
      },
    });
  }
}

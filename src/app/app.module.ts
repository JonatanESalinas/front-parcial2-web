import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { CalienteComponent } from './caliente/caliente.component';
import { RegistroComponent } from './registro/registro.component';

import {ServicioApiSoccerService } from './home/servicio-api-soccer.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConfiguracionComponent,
    CalienteComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ServicioApiSoccerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

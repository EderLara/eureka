import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Componentes externos como ng-bootstrap:
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Componentes creados en la vista:
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LinkComponent } from './componentes/link/link.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { InformesComponent } from './componentes/informes/informes.component';
import { ZonasComponent } from './componentes/zonas/zonas.component';
// Servicios:
import { UsuariosService } from './services/usuarios.service';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LinkComponent,
    LoginComponent,
    RegistroComponent,
    UsuariosComponent,
    InformesComponent,
    ZonasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UsuariosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

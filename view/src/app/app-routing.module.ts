import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LinkComponent } from './componentes/link/link.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { InformesComponent } from './componentes/informes/informes.component';
import { ZonasComponent } from './componentes/zonas/zonas.component';


const routes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'equipo', component: LinkComponent},
    {path: 'ingreso', component: LoginComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'usuarios/:page', component: UsuariosComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'zonas', component: ZonasComponent},
    {path: 'informes', component: InformesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

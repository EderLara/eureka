import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Componentes externos como ng-bootstrap:
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LinkComponent } from './componentes/link/link.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LinkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

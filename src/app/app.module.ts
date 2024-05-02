import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GuardarClienteComponent } from './crearclientes/guardar-cliente/guardar-cliente.component';
import { ActualizarClienteComponent } from './actualizar/actualizar-cliente/actualizar-cliente.component';
import { ListarClienteComponent } from './listar-cliente/listar-cliente.component';
import { EliminarClienteComponent } from './eliminar/eliminar-cliente/eliminar-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    GuardarClienteComponent,
    ActualizarClienteComponent,
    ListarClienteComponent,
    EliminarClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GuardarClienteComponent } from './crearclientes/guardar-cliente/guardar-cliente.component';
import { ListarClienteComponent } from './listar-cliente/listar-cliente.component';
import { ActualizarClienteComponent } from './actualizar/actualizar-cliente/actualizar-cliente.component';

const routes: Routes = [
{ path: '', redirectTo: 'guardar-cliente', pathMatch: 'full' },
{path:'listar-clientes', component:ListarClienteComponent},
{path:'guardar-cliente', component:GuardarClienteComponent},
{path:'actualizar-cliente/:Id',component:ActualizarClienteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }

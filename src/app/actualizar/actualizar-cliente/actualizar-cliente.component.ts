import { Component, OnInit } from '@angular/core';
import { ClienteServiceService } from '../../cliente-service.service';
import { Clientes } from '../../clientes';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.component.html',
  styleUrl: './actualizar-cliente.component.css'
})
export class ActualizarClienteComponent implements OnInit{
  cliente:Clientes = new Clientes
  constructor(public _clienteService: ClienteServiceService, private ruta:ActivatedRoute, private router: Router) { }
  
  
  ngOnInit(){

    //logica para recuperar el cliente
    const Id = this.ruta.snapshot.params['Id'];
    this._clienteService.getClientById(Id).subscribe((clientes)=>{
      this.cliente = clientes;
    }, (error)=>{
      console.log("Error")
    })


  }
  
  actualizarCliente(Id: number) {
    // Lógica para actualizar el cliente...
  // Una vez que la actualización se haya realizado correctamente, muestra la alerta de éxito
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'La actualización se ha realizado con éxito',
    showConfirmButton: false,
    timer: 1500
  })
    this._clienteService.updateClient(this.cliente, Id).subscribe(
      (Actualizar) => {
        console.log("Actualizada", this.actualizarCliente);
        //redirigir
       this.principal();

      }, (error) => {
        console.log("Error", error);
      }

    )
  }

  principal(){
    this.router.navigate(['/listar-clientes']);
  }

  
}
  

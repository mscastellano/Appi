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
    // Verificar si el apellido contiene números
    if(/\d/.test(this.cliente.Apellido)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Estos campos no pueden contener números'
      });
      return; // Salir de la función si el apellido contiene números
    }
      // Verificar si el apellido contiene números
      if(/\d/.test(this.cliente.Nombre)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Estos campos no pueden contener números'
        });
        return; // Salir de la función si el apellido contiene números
      }
      if(/\D/.test(this.cliente.Cedula)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Este campo solo puede contener números'
        });
        return; // Salir de la función si el teléfono contiene caracteres que no sean números
      }

      if (this.cliente.Cedula.length !== 10) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La cédula debe tener exactamente 10 dígitos'
        });
        return; // Salir de la función si la cédula no tiene 10 dígitos
      }
    
      // Verificar si la cédula no es un número repetido
      if (/^(\d)\1{9}$/.test(this.cliente.Cedula)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La cédula no puede ser un número repetido'
        });
        return; // Salir de la función si la cédula es un número repetido
      }

      if(/\D/.test(this.cliente.Telefono)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El teléfono solo puede contener números'
        });
        return; // Salir de la función si el teléfono contiene caracteres que no sean números
      }
     
      if(!/^09\d{8}$/.test(this.cliente.Telefono)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El teléfono debe comenzar con "09" y tener 10 dígitos'
        });
        return; // Salir de la función si el teléfono contiene caracteres que no sean números
      }
      
  
    // Lógica para actualizar el cliente...
    // Una vez que la actualización se haya realizado correctamente, muestra la alerta de éxito
    this._clienteService.updateClient(this.cliente, Id).subscribe(
      (Actualizar) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'La actualización se ha realizado con éxito',
          showConfirmButton: false,
          timer: 1500
        });
        console.log("Actualizada", this.actualizarCliente);
        //redirigir
        this.principal();
      }, 
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Vaya",
          text: "Algo ha salido mal",
        });
        console.log("Error", error);
      }
    );
  }
  

  principal(){
    this.router.navigate(['/listar-clientes']);
  }

  
}
  

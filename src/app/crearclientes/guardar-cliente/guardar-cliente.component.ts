import { Component } from '@angular/core';
import { Clientes } from '../../clientes';
import { ClienteServiceService } from '../../cliente-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-guardar-cliente',
  templateUrl: './guardar-cliente.component.html',
  styleUrl: './guardar-cliente.component.css' 
})
export class GuardarClienteComponent {

  clientes:Clientes = new Clientes;
  //contructor
  constructor( public _clienteService: ClienteServiceService,private router:Router ){}
  //metodo parar crear
  public guardarCliente(){
    if(/\d/.test(this.clientes.Apellido)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Apellido no puede contener números'
      });
      return; // Salir de la función si el apellido contiene números
    }
      // Verificar si el apellido contiene números
      if(/\d/.test(this.clientes.Nombre)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Nombre no puede contener números'
        });
        return; // Salir de la función si el apellido contiene números
      }
      if(/\D/.test(this.clientes.Cedula)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Cedula solo puede contener números'
        });
        return; // Salir de la función si el teléfono contiene caracteres que no sean números
      }
      if (this.clientes.Cedula.length !== 10) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La cédula debe tener exactamente 10 dígitos'
        });
        return; // Salir de la función si la cédula no tiene 10 dígitos
      }
    
      // Verificar si la cédula no es un número repetido
      if (/^(\d)\1{9}$/.test(this.clientes.Cedula)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La cédula no puede ser un número repetido'
        });
        return; // Salir de la función si la cédula es un número repetido
      }
      if(/\D/.test(this.clientes.Telefono)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El teléfono solo puede contener números'
        });
        return; // Salir de la función si el teléfono contiene caracteres que no sean números
      }
      if (!/^09\d{8}$/.test(this.clientes.Telefono)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El teléfono debe comenzar con "09" y tener 10 dígitos'
        });
        return; // Salir de la función si el teléfono no cumple con el formato especificado
      }
      
  
    this._clienteService.createClient(this.clientes).subscribe({next:(datos)=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cliente eliminado exitosamente",
        showConfirmButton: false,
        timer: 1500
      });
      this.listarClientes();
      console.log("Guardado")},});
    
  }
  listarClientes(): void {
    this.router.navigate(['listar-clientes']);
  }
}

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

  constructor( public _clienteService: ClienteServiceService,private router:Router ){}

  public guardarCliente(){
    if(/\d/.test(this.clientes.Apellido)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Apellido no puede contener números'
      });
      return; 
    }
      
      if(/\d/.test(this.clientes.Nombre)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Nombre no puede contener números'
        });
        return; 
      }
      if(/\D/.test(this.clientes.Cedula)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'cedula solo puede contener números'
        });
        return; 
      }
      if (this.clientes.Cedula.length !== 10) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La cédula debe tener exactamente 10 dígitos'
        });
        return; 
      }
    
      
      if (/^(\d)\1{9}$/.test(this.clientes.Cedula)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La cédula no puede ser un número repetido'
        });
        return;
      }
      if(/\D/.test(this.clientes.Telefono)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El teléfono solo puede contener números'
        });
        return; 
      }
      if (!/^09\d{8}$/.test(this.clientes.Telefono)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El teléfono debe comenzar con "09" y tener 10 dígitos'
        });
        return; 
      }
      if (this.validarCedula(this.clientes.Cedula)) {
        
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La cédula ingresada no es válida'
        });
        return;
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

  validarCedula(Cedula: string): boolean {
    
    if (Cedula.length !== 10) {
      return false;
    }
  
    const provincia = parseInt(Cedula.substring(0, 2));
    if (!(provincia >= 1 && provincia <= 24) && !(provincia === 17 || provincia === 20)) {
      return false;
    }
  
   
    const tercerDigito = parseInt(Cedula.charAt(2));
    if (tercerDigito >= 6) {
      return false;
    }
  
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;
    for (let i = 0; i < coeficientes.length; i++) {
      let valor = parseInt(Cedula.charAt(i)) * coeficientes[i];
      if (valor >= 10) {
        valor -= 9;
      }
      suma += valor;
    }
    const resultado = suma % 10 === 0 ? 0 : 10 - (suma % 10);
  
    const ultimoDigito = parseInt(Cedula.charAt(9));
    if (ultimoDigito !== resultado) {
      return false;
    }
  
    return true;
  }
  
}

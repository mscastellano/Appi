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
    
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Cliente guardado exitosamente",
      showConfirmButton: false,
      timer: 1500
    });
    this._clienteService.createClient(this.clientes).subscribe({next:(datos)=>{
      this.listarClientes();
      console.log("Guardado")},});
  }
  listarClientes(): void {
    this.router.navigate(['listar-clientes']);
  }
}

import { Component } from '@angular/core';
import { ClienteServiceService } from '../cliente-service.service';
import { Clientes } from '../clientes';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrl: './listar-cliente.component.css'
})
export class ListarClienteComponent {
[x: string]: any;
  constructor( public _clienteService: ClienteServiceService, private router:Router ){}
  clientes:Clientes[]

  ngOnInit(){
    this.getClients();
  }


  getClients(){

    this._clienteService.getClients().subscribe(
     (datos)=>{
      this.clientes=datos;
      console.log(this.clientes);

     }
    )
  }
 

  public eliminarCliente(Id:number){
    this._clienteService.deleteClient(Id).subscribe({next:(datos)=>{console.log("Eliminado")},});
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo"
    }).then((result) => {
      if (result.isConfirmed) {
        
        Swal.fire({
          title: "Deleted!",
          icon: "success"
        });
        window.location.reload();
      }else{
        console.log("Error al eliminar cliente")
      }
    });
    //window.location.reload();
  }

  editarCliente(Id:number){
    this.router.navigate(['actualizar-cliente',Id]);
  }

  principal(){
    this.router.navigate(['/listar-clientes'])
  }

  agregarcliente(){
    this.router.navigate(['/guardar-cliente'])
  }



}


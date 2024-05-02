import { Component } from '@angular/core';
import { ClienteServiceService } from '../../cliente-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-eliminar-cliente',
  templateUrl: './eliminar-cliente.component.html',
  styleUrl: './eliminar-cliente.component.css'
})
export class EliminarClienteComponent {
  constructor( public _clienteService: ClienteServiceService ){}

 
}


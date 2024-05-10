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
export class ActualizarClienteComponent implements OnInit {
  cliente: Clientes = new Clientes
  constructor(public _clienteService: ClienteServiceService, private ruta: ActivatedRoute, private router: Router) { }


  ngOnInit() {

    //logica para recuperar el cliente
    const Id = this.ruta.snapshot.params['Id'];
    this._clienteService.getClientById(Id).subscribe((clientes) => {
      this.cliente = clientes;
    }, (error) => {
      console.log("Error")
    })


  }

  actualizarCliente(Id: number) {
    // Verificar si el apellido contiene números
    if (/\d/.test(this.cliente.Apellido)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Estos campos no pueden contener números'
      });
      return; // Salir de la función si el apellido contiene números
    }
    // Verificar si el apellido contiene números
    if (/\d/.test(this.cliente.Nombre)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Estos campos no pueden contener números'
      });
      return; // Salir de la función si el apellido contiene números
    }
    if (/\D/.test(this.cliente.Cedula)) {
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

    if (/\D/.test(this.cliente.Telefono)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El teléfono solo puede contener números'
      });
      return; // Salir de la función si el teléfono contiene caracteres que no sean números
    }

    if (!/^09\d{8}$/.test(this.cliente.Telefono)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El teléfono debe comenzar con "09" y tener 10 dígitos'
      });
      return; // Salir de la función si el teléfono contiene caracteres que no sean números
    }
    if (this.validarCedula(this.cliente.Cedula)) {
      // La cédula es válida, continuar con el proceso de guardar el cliente
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La cédula ingresada no es válida'
      });
      return;
    }


    // Lógica para actualizar el cliente...
    // Una vez que la actualización se haya realizado correctamente, muestra la alerta de éxito
    this._clienteService.updateClient(this.cliente, Id).subscribe(
      (Actualizar) => {
     
        console.log("Actualizada", this.actualizarCliente);
        //redirigir
        this.principal();
      },
      (error) => {
  
        console.log("Error", error);
      }
    );
  }


  principal() {
    this.router.navigate(['/listar-clientes']);
  }

  confirmarActualizacion(id: number) {
    Swal.fire({
      title: "¿Quieres guardar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: "No Guardar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.actualizarCliente(id);
      } else if (result.isDenied) {
        Swal.fire("", "", "info");
      }
    });
  }

  validarCedula(Cedula: string): boolean {
    // Longitud de la cédula debe ser 10 dígitos
    if (Cedula.length !== 10) {
      return false;
    }
  
    // Los primeros dos dígitos deben ser 17 o 20 (para cédulas antiguas) o un número entre 01 y 24 (para cédulas nuevas)
    const provincia = parseInt(Cedula.substring(0, 2));
    if (!(provincia >= 1 && provincia <= 24) && !(provincia === 17 || provincia === 20)) {
      return false;
    }
  
    // El tercer dígito debe ser menor a 6
    const tercerDigito = parseInt(Cedula.charAt(2));
    if (tercerDigito >= 6) {
      return false;
    }
  
    // Algoritmo de verificación de cédula
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
  
    // El último dígito de la cédula debe ser igual al resultado del algoritmo
    const ultimoDigito = parseInt(Cedula.charAt(9));
    if (ultimoDigito !== resultado) {
      return false;
    }
  
    return true;
  }
}


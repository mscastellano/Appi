import { Component, OnInit } from '@angular/core';
import { ClienteServiceService } from './cliente-service.service';
import { Clientes } from './clientes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  constructor( public _clienteService: ClienteServiceService ){}
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


}

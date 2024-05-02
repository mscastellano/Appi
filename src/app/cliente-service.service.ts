import { Injectable } from '@angular/core';
import { global } from './global';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Clientes } from './clientes';



@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {
  obtenerPorId(id_producto: any) {
    throw new Error('Method not implemented.');
  }
  navigate(arg0: (string | number)[]) {
    throw new Error('Method not implemented.');
  }

  public url = global.URL
 

  constructor( private http: HttpClient ) { }


  getClients():Observable<Clientes[]>{
    return this.http.get<Clientes[]>(this.url + "cliente/")
  }

   // Obtener un cliente por su ID
   getClientById(id: number): Observable<Clientes> {
    return this.http.get<Clientes>(this.url + "cliente/" + id);
  }

  // Crear un nuevo cliente
  createClient(cliente: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(this.url + "cliente/", cliente);
  }

  // // Actualizar un cliente existente
  updateClient(cliente: Clientes, Id:number): Observable<Clientes> {
    return this.http.put<Clientes>(`${this.url}cliente/${Id}`, cliente);
  }

  // Eliminar un cliente
  deleteClient(Id: number): Observable<void> {
    return this.http.delete<void>(this.url + "cliente/" + Id);
  }

  
}

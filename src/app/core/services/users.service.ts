import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { USER } from 'src/app/core/Consts/Index';
import { Contact } from 'src/app/core/Models/Contact.model'

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ApiService{
  /**
   * getAllContacts: metodo para consultar toda la lista de contactos
   */
  public getAllContacts(): Observable<any> {
    return this.get(USER.BASE);
  }

  /**
    * getAllCompanies: metodo para consultar toda la lista de empresas registradas
    */
  public getAllCompanies(): Observable<any> {
    return this.get(USER.BASE + "/companies/");
  }

  /**
  * getAllContactsByPage: metodo para hacer uso del paginado en los resultados
  */
    public getAllContactsByPage(pageNumber: number): Observable<any> {
    return this.get(USER.BASE + "?pageNumber=" + pageNumber +"&PageSize=5");
  }

  /**
    * getAllContactsByPage: metodo para filtrar por empresa y hacer uso del paginado en los resultados
    */
  public getContactsByCompanyAndPage(pageNumber: number, company: string): Observable<any> {
      return this.get(USER.BASE + "/company/"+ company +"?pageNumber=" + pageNumber +"&PageSize=5");
  }

  /**
   * createContact: metodo para crear un contacto
   */
  public createContact(contact: Contact): Observable<any> {
    return this.post(USER.BASE, contact);
  }

  /**
   * updateContact: metodo para actualizar los datos de un contacto
   */
  public updateContact(contact: Contact, id: number): Observable<any> {
    return this.update(USER.BASE + "/id/" + id, contact);
  }

  /**
   * deleteContact: metodo para eliminar un contacto
   */
  public deleteContact(contact: Contact, id: number): Observable<any> {
    return this.delete(USER.BASE + "/id/" + id);
  }
}

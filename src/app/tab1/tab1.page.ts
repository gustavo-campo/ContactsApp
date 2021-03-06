import { Component } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Contact } from 'src/app/core/Models/Contact.model';
import { EditModalPage } from 'src/app/tab1/editModal/editModal';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private userService: UsersService, public modalController: ModalController) {}

  //lista de contactos a mostrar
  contactList: Contact[];

  //lista de empresas
  companies: string[] = ["Todos"];

  //empresa seleccionada, por defecto todos
  selectedCompany = "Todos";

  //indice de resultados, se inicializa en la primer pagina
  pageIndex = 1;

  ngOnInit() {
    //consultamos todas las empresas registradas
    this.userService.getAllCompanies().subscribe(data => {
      console.log(data.data);
      this.companies = data.data;
      this.companies.unshift("Todos");
    });

    //al iniciar consultamos al servidor y pedimos la pagina 1 de resultados
    this.userService.getContactsByCompanyAndPage(this.pageIndex, this.selectedCompany).subscribe(data => {
      this.contactList = data.data;
      //actualizamos el indice
      this.pageIndex += 1;
    });
    
  }

  //metodo para actualizar la lista luego de seleccionar una empresa
  refreshContacts() {
    //re inicializamos el indice
    this.pageIndex = 1;
    //volvemos a consultar
    this.userService.getContactsByCompanyAndPage(this.pageIndex, this.selectedCompany).subscribe(data => {
      this.contactList = data.data;
      //actualizamos el indice
      this.pageIndex += 1;
    });
  }

  //metodo que se ejecuta al llegar al final de la lista, intenta traer mas resultados
  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      //volvemos a consultar al servidor pero con el index actualizado
      this.userService.getContactsByCompanyAndPage(this.pageIndex, this.selectedCompany).subscribe(data => {
        data.data.forEach(element => {
          this.contactList.push(element);
        });
        //actualizamos el numero de pagina
        this.pageIndex += 1;
      });

    }, 500);
  }

  //metodo para invocar el modal para editar contactos
  async presentModal(_tempContact: Contact) {
    const modal = await this.modalController.create({
      component: EditModalPage,
      componentProps: {
        //este es el elemento Contact que enviamos
        tempContact: _tempContact
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  selectAction(data: any) {
    this.selectedCompany = data.detail.value;
    this.refreshContacts();
  }

}

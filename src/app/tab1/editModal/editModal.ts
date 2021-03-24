import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Contact } from 'src/app/core/Models/Contact.model';

@Component({
  selector: 'edit-modal-page',
  templateUrl: 'editModal.html'
})

export class EditModalPage {
  //recibimos un elemento de tipo Contact del componente padre
  @Input()
  tempComtact: Contact;
  constructor(public modalController: ModalController) {}

  //metodo para cerrar el modal
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
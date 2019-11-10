import { Component, ViewChild } from '@angular/core';
import {StorageService, Item} from '../services/storage.service';
import {Platform, ToastController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  items: Item[] = [];

  newItem: Item = {} as Item;

  @ViewChild('myList',  {static: false})myList: IonList;

  constructor(private storageService: StorageService, private plt: Platform, private toastController: ToastController) {

    this.plt.ready().then(() => {

      this.loadItems();
    });
  }

  addItem() {
    this.storageService.addItem(this.newItem).then(item => {

      this.newItem = {} as Item;
      this.showToast('Item Added!');
      this.loadItems();
    });
  }

  loadItems() {
    this.storageService.getItems().then(items => {
      this.items = items;
    });
  }

  deleteItem(item: Item) {
    this.storageService.deleteItem(item.id).then( item => {
      this.showToast(' Item removed!');
      this.myList.closeSlidingItems();
      this.loadItems();

    });

  }
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}

import { Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PluginListenerHandle } from '@capacitor/core';
import { ConnectionStatus, Network } from '@capacitor/network';
import { ModalController } from '@ionic/angular';
import { ErrorPage } from '../error/error.page';
import { EmptyScreenComponent } from './components/empty-screen/empty-screen.component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit, OnDestroy {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  private ngZone = inject(NgZone);
  private modalCtrl = inject(ModalController);
  networkListener!: PluginListenerHandle;
  status!: boolean
  model = {};
  constructor() { }
  ngOnDestroy(): void {
    if (this.networkListener) this.networkListener.remove();
  }

  async ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.networkListener = await Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      this.ngZone.run(() => {
        this.changeStatus(status);
      })
    });


    const status = await Network.getStatus();
    console.log('Network status:', status);
    this.changeStatus(status);
    console.log('Network status:', this.status);

  }
  async open(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: EmptyScreenComponent,
      componentProps:{
        'model':this.model
      }
    });
     modal.present();
     await modal.onWillDismiss();

    this.ngOnInit();
  }
  changeStatus(status: ConnectionStatus): void {
    this.status = status?.connected;
    if (!this.status) {
      this.model = {
        background: 'assets/imgs/12.png',
        title: 'No Connection',
        subtitle: 'Your internet connection was',
        description: 'interrupted, Please retry',
        titleColor: 'dark',
        color: 'medium',
        button: 'RETRY',
        buttonColor: 'dark',
        centerAlign: true
      }
      this.ngOnDestroy();
      this.open();
    }
  }
  checkStatus(event: any) {
    this.ngOnInit();
  }

}

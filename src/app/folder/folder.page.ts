import { Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PluginListenerHandle } from '@capacitor/core';
import { ConnectionStatus, Network } from '@capacitor/network';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit, OnDestroy {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  private ngZone = inject(NgZone);
  networkListener!: PluginListenerHandle;
  status!: boolean
  model = {};
  constructor() {}
  ngOnDestroy(): void {
    if(this.networkListener) this.networkListener.remove();
  }

  async ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.networkListener = await Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      this.ngZone.run(()=> {
        this.changeStatus(status);
      })
    });


      const status = await Network.getStatus();
      console.log('Network status:', status);
      this.changeStatus(status);
      console.log('Network status:', this.status);

  }

  changeStatus(status: ConnectionStatus) : void{
    this.status = status?.connected;
    if(!this.status) {
      this.model = {
        background: 'assets/imgs/12.png',
        title: 'No Connection',
        subtitle: 'Your internet connection was',
        description: 'interrupted, Please retry',
        titleColor: 'dark',
        color: 'medium',
        button: 'RETRY',
        buttonColor: 'dark'
      }
      this.ngOnDestroy();
    }
  }
  checkStatus(event: any){

  }

}

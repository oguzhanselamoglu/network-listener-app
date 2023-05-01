import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-empty-screen',
  templateUrl: './empty-screen.component.html',
  styleUrls: ['./empty-screen.component.scss'],
})
export class EmptyScreenComponent implements OnInit {

  @Input() model : any;
  @Output() retry: EventEmitter<any> = new EventEmitter<any>();

  //private modalCtrl = Inject(ModalController);
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  retryButton() {
   // this.retry.emit(true);
    this.modalCtrl.dismiss();
  }

}

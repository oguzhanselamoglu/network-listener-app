import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-empty-screen',
  templateUrl: './empty-screen.component.html',
  styleUrls: ['./empty-screen.component.scss'],
})
export class EmptyScreenComponent implements OnInit {

  @Input() model : any;
  //@Output() retry

  constructor() { }

  ngOnInit() {}

}

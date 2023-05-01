import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { ComponentsModule } from './components/components.module';
import { ErrorPageModule } from '../error/error.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    ComponentsModule,
    ErrorPageModule
  ],
  declarations: [FolderPage]
})
export class FolderPageModule {}

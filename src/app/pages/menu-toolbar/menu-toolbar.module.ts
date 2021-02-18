import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuToolbarPageRoutingModule } from './menu-toolbar-routing.module';

import { MenuToolbarPage } from './menu-toolbar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuToolbarPageRoutingModule
  ],
  declarations: [MenuToolbarPage],
  exports: [MenuToolbarPage]
})
export class MenuToolbarPageModule {}

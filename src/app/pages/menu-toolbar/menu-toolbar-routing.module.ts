import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuToolbarPage } from './menu-toolbar.page';

const routes: Routes = [
  {
    path: '',
    component: MenuToolbarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuToolbarPageRoutingModule {}

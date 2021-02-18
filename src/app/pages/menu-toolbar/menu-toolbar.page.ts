import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-toolbar',
  templateUrl: './menu-toolbar.page.html',
  styleUrls: ['./menu-toolbar.page.scss'],
})
export class MenuToolbarPage implements OnInit {
  @Input() pageTitle = 'POKEMONS';
  constructor() { }

  ngOnInit() {
  }

}

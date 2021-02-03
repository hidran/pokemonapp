import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from '../services/pokemon-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  pokemons : [];

  constructor( public pokService: PokemonApiService) { }

  ngOnInit() {
     this.pokService.getPokemons().subscribe(res => {
      
      this.pokemons = res['results'];
     });
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/Pokemon';
import { PokemonApiService } from '../services/pokemon-api.service';

@Component({
  selector: 'app-favorite',
  templateUrl: '../home/home.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  pokemons$ :Observable<Pokemon[]>;
  constructor( private pokService: PokemonApiService) { }

  ngOnInit() {
  }
   ionViewWillEnter(){
    this.pokemons$ = this.pokService.getFavoritePokemon();
   }
}

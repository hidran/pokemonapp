import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Pokemon} from '../models/Pokemon';
import {PokemonApiService} from '../services/pokemon-api.service';

@Component({
  selector: 'app-favorite',
  templateUrl: '../home/home.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  public pageTitle = 'Favorite pokemons';
  pokemons$: Observable<Pokemon[]>;
  public isFavoritePage = true;
  constructor(private pokService: PokemonApiService) {
  }

  ngOnInit() {
  }

  populateFavorite() {
    this.pokemons$ = this.pokService.getFavoritePokemon('');

  }

  ionViewWillEnter() {
    this.populateFavorite();
  }

  filterPokemons($event) {
    this.pokemons$ = this.pokService.getFavoritePokemon($event.target.value);
  }

  async favorite(pok: Pokemon) {
    await this.pokService.addPokemonToFavorite(pok, true);
    this.populateFavorite();
    this.pokemons$.subscribe(res => {
      console.log('pokemons reloaded = ' + res.length);
    });
  }

  share(pok: Pokemon) {

  }
}

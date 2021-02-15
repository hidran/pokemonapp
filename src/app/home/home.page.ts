import {Component, OnInit} from '@angular/core';
import {PokemonApiService} from '../services/pokemon-api.service';
import {Pokemon} from '../models/Pokemon';
import {Observable} from 'rxjs';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  pokemons$: Observable<Pokemon[]>;
  public pageTitle = 'POKEMONS';
  private loading: any;
  public isFavoritePage = false;
  public favorites: Pokemon[];

  constructor(public pokService: PokemonApiService,
              private loadingCtrl: LoadingController
  ) {


  }

  async ngOnInit() {
    this.loading = await this.presentLoading();
    this.favorites = await this.pokService.getFavoritePokemon('').toPromise();
    await this.loading.present();
    this.pokemons$ = this.pokService.getPokemons('');
    this.pokemons$.subscribe(() => {
      this.loading.dismiss();
    });
  }

  public isPokFavorite(pok: Pokemon) {
    const poks = this.favorites.filter(fPok => fPok.name === pok.name);
    return poks.length > 0;
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({

      message: 'Please wait...'

    });

    return loading;
  }

  filterPokemons($event) {
    this.pokemons$ = this.pokService.getPokemons($event.target.value);
  }

  async favorite(pok: Pokemon) {

    const result = await this.pokService.addPokemonToFavorite(pok, this.isPokFavorite(pok)
    );
  }

  share(pok: Pokemon) {

  }
}

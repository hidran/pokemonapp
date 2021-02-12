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

  private loading: any;

  constructor(public pokService: PokemonApiService,
              private loadingCtrl: LoadingController
  ) {


  }

  async ngOnInit() {
    this.loading = await this.presentLoading();
    await this.loading.present();
    this.pokemons$ = this.pokService.getPokemons('');
    this.pokemons$.subscribe(() => {
      this.loading.dismiss();
    });
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

  clearFilter($event) {

  }
}

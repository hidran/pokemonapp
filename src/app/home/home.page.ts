import {Component, OnInit, ViewChild} from '@angular/core';
import {PokemonApiService} from '../services/pokemon-api.service';
import {Pokemon} from '../models/Pokemon';
import {Observable} from 'rxjs';
import {IonList, LoadingController, ToastController} from '@ionic/angular';

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
  @ViewChild(IonList) pokList: IonList;

  constructor(public pokService: PokemonApiService,
              private loadingCtrl: LoadingController,
              private toast: ToastController
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

  async presentToast(msg: string, color: string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      position: 'middle',
      animated : true,
      color
    });
    return await toast.present();
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

  async favorite(pok: Pokemon, event) {
    const isFav = this.isPokFavorite(pok);
    const result = await this.pokService.addPokemonToFavorite(pok, isFav);
    this.favorites = await this.pokService.getFavoritePokemon('').toPromise();
    let item;
    if (event.target.nodeName.toUpperCase() === 'ION-ICON') {
      item = event.target.parentNode;
    } else {
      item = event.target;
    }


    if (!isFav && result) {
      item.color = 'danger';
      await this.presentToast(pok.name + ' added to favorite!', 'danger');
    } else {
      item.color = 'primary';
      await this.presentToast(pok.name + ' removed to favorite!', 'primary');
    }
    await this.pokList.closeSlidingItems();
  }

  share(pok: Pokemon) {

  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../models/Pokemon';
import {environment} from '../../environments/environment';
import { IPokemonData } from '../interfaces/ipokemons';
import { Observable } from 'rxjs';
import { PokemonApiService } from '../services/pokemon-api.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
})
export class PokemonDetailsPage implements OnInit {

  public pokemon: Pokemon;
  public pokemonData$: Observable<IPokemonData>;
  private id: number;
  constructor(private router: ActivatedRoute,
     private  pokService: PokemonApiService,
private loadingCtrl: LoadingController
     ) { }

  async ngOnInit() {

    const loading =  await this.loadingCtrl.create({

      message: 'Please wait...'

    });
     await loading.present();
    const id = +this.router.snapshot.paramMap.get('id');
    this.id = id;
    const name = this.router.snapshot.queryParamMap.get('name');
    this.pokemon = new Pokemon({name, url:environment.pokImgUrl  + id +'/'});
    this.pokemonData$ = this.pokService.getPokemonData(id);
    this.pokemonData$.subscribe(() => loading.dismiss());
  }
  addToFavorite(){

  }
  share(){

  }
}

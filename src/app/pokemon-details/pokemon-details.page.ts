import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../models/Pokemon';
import {environment} from '../../environments/environment';
@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
})
export class PokemonDetailsPage implements OnInit {

  public pokemon: Pokemon;
  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    const id = this.router.snapshot.paramMap.get('id');
    const name = this.router.snapshot.queryParamMap.get('name');
    this.pokemon = new Pokemon({name, url:environment.pokImgUrl  + id +'/'})
  }

}

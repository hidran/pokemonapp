import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  constructor(public http: HttpClient) { }

  getPokemons(){
 console.log(environment)
     return this.http.get(environment.pokUrl + '?limit=' + environment.limit);

  }
}

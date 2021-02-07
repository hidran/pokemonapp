import { Pokemon } from '../models/Pokemon';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { IPokemon, IPokemonData, IResult } from '../interfaces/ipokemons';
import {  tap, map } from 'rxjs/operators';
import { Observable, from, merge } from 'rxjs';
import {Storage} from '@ionic/storage';

const POKEMON_KEY = 'pokemons';
const POKEMON_FAVORITE = 'pokemons-favorite';
/**
 *  -- --- --- --- --|
 *  -----------------| -------------
 *
 */
@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  constructor(private http: HttpClient, private storage:Storage) { }

  getPokemons(): Observable<Pokemon[]> {

     const url = environment.pokUrl + '?limit=' + environment.limit;

     const cacheData = from(this.storage.get(POKEMON_KEY));
            cacheData.subscribe(res =>{
              console.log('cache:', res);
            })
     return merge(cacheData,this.http.get<IResult>(url))
     .pipe(

       map((res:IResult) =>{
         if(!res){
           return [];
         }
         this.storage.set(POKEMON_KEY,res);
          return res.results.map(res => new Pokemon(res));

      }),
       tap((res:Pokemon[]) => console.log(res))
       );

  }

  getPokemonData(id: number):Observable<IPokemonData>{
    const url = environment.pokUrl + '/'+ id + '/';
    return  this.http.get<IPokemonData>(url).pipe(
      tap(res => console.log(res))
    );
  }

  async addPokemonToFavorite(pok: Pokemon, isFavorite: boolean){

     let data:Pokemon[] = await this.storage.get(POKEMON_FAVORITE) ?? [];

         if(!isFavorite && data.some((res) => +res.id === +pok.id)){
           return;
         }
      if(!isFavorite){
        data.push(pok)
      } else {
        data = data.filter(res => res.id !== pok.id);
      }
      return await this.storage.set(POKEMON_FAVORITE, data);
  }

   getFavoritePokemon():Observable<Pokemon[]>{
    return from(this.storage.get(POKEMON_FAVORITE));
   }
   async isPokemonFavorite(pok:Pokemon){
    let data:Pokemon[] = await this.storage.get(POKEMON_FAVORITE) ?? [];
    if(data.length === 0){
      return false;
    }
    if(data.some((res) => +res.id === +pok.id)){
      return true;
    }

    return false;
   }
}

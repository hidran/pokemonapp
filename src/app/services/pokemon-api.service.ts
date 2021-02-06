import { Pokemon } from '../models/Pokemon';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { IPokemon, IPokemonData, IResult } from '../interfaces/ipokemons';
import { switchMap, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  constructor(public http: HttpClient) { }

  getPokemons(): Observable<Pokemon[]> {
     const url = environment.pokUrl + '?limit=' + environment.limit;
     return this.http.get<IResult>(url)
     .pipe(

       map((res:IResult) => res.results.map(res => new Pokemon(res))),
       tap((res:Pokemon[]) => console.log(res))
       );

  }

  getPokemonData(id: number):Observable<IPokemonData>{
    const url = environment.pokUrl + '/'+ id + '/';
    return  this.http.get<IPokemonData>(url).pipe(
      tap(res => console.log(res))
    );
  }
}

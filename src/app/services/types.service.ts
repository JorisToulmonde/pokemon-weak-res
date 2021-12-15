import pokemonFr from '../../assets/dictionnary/pokemon-fr.json';
import pokemonEn from '../../assets/dictionnary/pokemon-en.json';
import typeEn from '../../assets/dictionnary/type-en.json';
import typeFr from '../../assets/dictionnary/type-fr.json';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Type, Types, types } from '../types/types';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  allTypes = types;

  finalWeakness: any;
  finalResist: any;
  finalIgnored: any;

  pokemonSubject = new Subject<string>();
  pokemon: string;

  private pokemonApi = "https://pokeapi.co/api/v2/pokemon/";

  constructor(private httpClient: HttpClient) {
  }

  emitPokemonSubject() {
    this.pokemonSubject.next(this.pokemon);
  }

  getAllTypes(){
    return this.allTypes;
  }

  getWeaknessesAndResistances(typeOne: Type, typeTwo: Type){
    let weaknessT1 = typeOne.weaknesses;
    let weaknessT2 = typeTwo.weaknesses;
    let resistT1 = typeOne.resistances;
    let resistT2 = typeTwo.resistances;

    let allWeakness = weaknessT1.concat(weaknessT2);
    let allResist = resistT1.concat(resistT2);

    let intersectionFromWeak = allWeakness.filter(type => allResist.indexOf(type) != -1);
    let intersectionFromResist = allResist.filter(type => allWeakness.indexOf(type) != -1);

    allWeakness = this.filteringWeaknessOrResist(allWeakness, intersectionFromResist);
    allResist = this.filteringWeaknessOrResist(allResist, intersectionFromWeak);

    this.finalWeakness = allWeakness.reduce((acc, type) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    },{});

    this.finalResist = allResist.reduce((acc, type) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    },{});

    this.finalIgnored = typeOne.ignore.concat(typeTwo.ignore);
  }

  filteringWeaknessOrResist(array, intersection){
    var inter = [...intersection];
    return array.filter(type => {
      if(inter.indexOf(type) != -1){
        inter.splice(inter.indexOf(type),1);
        return false;
      }
      return inter.indexOf(type) == -1
    });
  }

  getFrTypeOf(type: Types){
    return Types[typeFr[typeEn.indexOf(type.charAt(0).toUpperCase()+type.slice(1))]];
  }

  getById(pokemon: string){
    return pokemonFr.indexOf(pokemon) + 1;
  }

  getTypeBy(element: Types){
    return this.allTypes.filter(x => x.element === element)[0];
  }

  getByName(pokemonName: string){
    return pokemonEn[pokemonFr.indexOf(pokemonName)];
  }

  getApiURL(){
    return this.pokemonApi;
  }

  getPokemonFromName(name: string): Observable<any>{
    return this.httpClient.get(this.getApiURL()+name.toLowerCase());
  }
}

import { Component, OnInit } from '@angular/core';
import { Type } from '../types/Type';
import { TypesService } from '../services/types.service';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-list-type',
  templateUrl: './list-type.component.html',
  styleUrls: ['./list-type.component.css']
})
export class ListTypeComponent implements OnInit {

  allTypes: Array<Type>;
  typeOne = new Type();
  typeTwo = new Type();
  nbTypeSelected = 0;
  reset = false;
  finalWeaknesses = {};
  finalResists = {};
  finalIgnore = [];

  pokemonSubscription: Subscription;
  pokemon: string;

  sprite: string;
  isDisplaySprite = false;

  constructor(private typesService : TypesService) { }

  ngOnInit() {
    this.allTypes = this.typesService.getAllTypes();
    this.pokemonSubscription = this.typesService.pokemonSubject.subscribe(
      (pokemon: string) => {
        this.pokemon = pokemon;
        this.onSubmit();
      }
    );
  }

  weakAndRes(element: string){
    this.removeSprite();
    var type = this.allTypes.find(x => x.element === element);

    if(this.checkSameTypeSelectedTwice(type)) return;

    this.assignType(type);
    this.displaySensibities();
  }

  displaySensibities(){
    this.typesService.getWeaknessesAndResistances(this.typeOne, this.typeTwo);

    this.finalWeaknesses = this.typesService.finalWeakness;
    this.finalResists = this.typesService.finalResist;
    this.finalIgnore = this.typesService.finalIgnored;
  }

  isTypeSelected(type: Type){
    return this.typeOne.getElement() === type.getElement() || this.typeTwo.getElement() === type.getElement();
  }

  assignType(type: Type){
    this.checkNbTypeSelected();
    if(this.nbTypeSelected == 0){
      this.typeOne = type;
    }else if(this.nbTypeSelected == 1){
      this.typeTwo = type;
      this.reset = true;
    }
    this.nbTypeSelected++;
  }

  checkNbTypeSelected(){
    if(this.reset){
      this.typeOne = this.typeTwo = this.typesService.type;
      this.nbTypeSelected = 0;
      this.reset = false;
    }
  }

  checkSameTypeSelectedTwice(type: Type){
    if(type === this.typeOne){
      this.nbTypeSelected = 1;
      return true;
    }
    return false;
  }

  calculResist(element: string){
    return 2*this.finalResists[element];
  }

  calculWeak(element: string){
    return 2*this.finalWeaknesses[element];
  }

  checkStandardType(element: string){
    return this.finalResists[element] === undefined && this.finalWeaknesses[element] === undefined && this.finalIgnore.indexOf(element) == -1;
  }

  checkIsWeakness(element: string){
    return this.finalWeaknesses[element] != undefined && this.finalIgnore.indexOf(element) == -1;
  }

  checkIsResist(element: string){
    return this.finalResists[element] != undefined && this.finalIgnore.indexOf(element) == -1;
  }

  checkIsImmune(element: string){
    return this.finalIgnore.indexOf(element) != -1;
  }

  getFrTypeOf(type: string){
    return this.typesService.getFrTypeOf(type);
  }

  getTypeBy(element: string){
    return this.typesService.getTypeBy(element);
  }

  onSubmit(){
    this.removeSprite();
    //Il faut mettre la premiere lettre en majuscule pour respecter la case du dictionnaire.
    let name = this.typesService.getByName(this.pokemon.charAt(0).toUpperCase() + this.pokemon.slice(1));
    if(name !== null){
      let res = this.typesService.getPokemonFromName(name).then(res => {
        this.handleTypes(res);
        this.handleSprite(res);
      });
    }
  }

  handleTypes(response: any){
    let typeOne = response.types[0].type.name;

    //Le second type peut etre nul car un pokemon peut n'avoir qu'un seul type. Il faut donc regarder si le type existe avant.
    let typeTwo = response.types[1] === undefined ? undefined : response.types[1].type.name;
    typeOne = this.getFrTypeOf(typeOne);
    typeOne = this.getTypeBy(typeOne);

    if(typeTwo != undefined){
      typeTwo = this.getFrTypeOf(typeTwo);
      typeTwo = this.getTypeBy(typeTwo);
    }else{
      typeTwo = this.typesService.type;
    }

    this.typeOne = typeOne;
    this.typeTwo = typeTwo;
    this.reset = true;

    this.displaySensibities();
  }

  handleSprite(response: any){
    this.sprite = response.sprites.front_default;
    if(this.sprite != null){
      this.isDisplaySprite = true;
    }
  }

  removeSprite(){
    this.isDisplaySprite = false;
    this.sprite = null;
  }

}

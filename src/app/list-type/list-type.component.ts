import { Component, OnInit } from '@angular/core';
import { TypesService } from '../services/types.service';
import { Subscription } from 'rxjs';
import { Type, Types } from '../types/types';

@Component({
  selector: 'app-list-type',
  templateUrl: './list-type.component.html',
  styleUrls: ['./list-type.component.css']
})
export class ListTypeComponent implements OnInit {
  
  allTypes: Array<Type>;
  typeOne = this.getDefaultType();
  typeTwo = this.getDefaultType();
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
    return this.typeOne.element === type.element || this.typeTwo.element === type.element;
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
      this.typeOne = this.typeTwo = this.getDefaultType();
      this.nbTypeSelected = 0;
      this.reset = false;
    }
  }

  checkSameTypeSelectedTwice(type: Type){
    if(type.element === this.typeOne.element){
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

  getFrTypeOf(type: Types){
    return this.typesService.getFrTypeOf(type);
  }

  getTypeBy(element: Types){
    return this.typesService.getTypeBy(element);
  }

  onSubmit(){
    this.removeSprite();
    //Il faut mettre la premiere lettre en majuscule pour respecter la case du dictionnaire.
    let name = this.typesService.getByName(this.pokemon.charAt(0).toUpperCase() + this.pokemon.slice(1));
    if(name !== null){
      let res = this.typesService.getPokemonFromName(name).subscribe(res => {
        let typeOne = res.types[0].type.name;
        let typeTwo = res.types[1] === undefined ? undefined : res.types[1].type.name;
        let sprite = res.sprites.front_default;

        this.handleTypes(typeOne, typeTwo);
        this.handleSprite(sprite);
      });
    }
  }

  handleTypes(firstType: Types, secondType: Types){
    let typeOne = this.getTypeBy(this.getFrTypeOf(firstType));
    let typeTwo = (secondType != undefined) ? this.getTypeBy(this.getFrTypeOf(secondType)) : this.getDefaultType();

    this.typeOne = typeOne;
    this.typeTwo = typeTwo;
    this.reset = true;

    this.displaySensibities();
  }

  handleSprite(sprite: any){
    this.sprite = sprite;
    if(this.sprite != null){
      this.isDisplaySprite = true;
    }
  }

  removeSprite(){
    this.isDisplaySprite = false;
    this.sprite = null;
  }

  getDefaultType() {
    return {
      element: undefined,
      weaknesses: [],
      resistances: [],
      ignore: [],
      icon: ''
    }
  }

}

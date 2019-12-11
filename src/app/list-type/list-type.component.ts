import { Component, OnInit } from '@angular/core';
import { Type } from '../types/Type';
import { TypesService } from '../services/types.service';
import { Subscription } from 'rxjs';

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
      let res = this.typesService.getPokemonFromName(name).subscribe(res => {
        let typeOne = res.types[0].type.name;
        let typeTwo = res.types[1] === undefined ? undefined : res.types[1].type.name;
        let sprite = res.sprites.front_default;

        this.handleTypes(typeOne, typeTwo);
        this.handleSprite(sprite);
      });
    }
  }

  handleTypes(firstType: string, secondType: string){
    let typeOne = this.getTypeBy(this.getFrTypeOf(firstType));
    let typeTwo = (secondType != undefined) ? this.getTypeBy(this.getFrTypeOf(secondType)) : this.typesService.type;

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

}

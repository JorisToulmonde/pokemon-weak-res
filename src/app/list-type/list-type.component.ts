import { Component, OnInit } from '@angular/core';
import { Type } from '../types/Type';
import { TypesService } from '../types.service';

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

  constructor(private typesService : TypesService) { }

  ngOnInit() {
    this.allTypes = this.typesService.getAllTypes();
  }

  displayWeakAndRes(element: string){
    var type = this.allTypes.find(x => x.element === element);

    if(this.checkSameTypeSelectedTwice(type)) return;

    this.assignType(type);

    this.typesService.getWeaknessesAndResistances(this.typeOne, this.typeTwo);

    this.finalWeaknesses = this.typesService.finalWeakness;
    this.finalResists = this.typesService.finalResist;
    this.finalIgnore = this.typesService.finalIgnored;
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


}

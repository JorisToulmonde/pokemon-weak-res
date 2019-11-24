import { Acier } from './types/Acier';
import { Injectable } from '@angular/core';
import { Type } from './types/Type';
import { Feu } from './types/Feu';
import { Eau } from './types/Eau';
import { Plante } from './types/Plante';
import { Vol } from './types/Vol';
import { Tenebre } from './types/Tenebre';
import { Spectre } from './types/Spectre';
import { Sol } from './types/Sol';
import { Roche } from './types/Roche';
import { Psy } from './types/Psy';
import { Poison } from './types/Poison';
import { Insecte } from './types/Insecte';
import { Glace } from './types/Glace';
import { Fee } from './types/Fee';
import { Electrik } from './types/Electrik';
import { Dragon } from './types/Dragon';
import { Combat } from './types/Combat';
import { Normal } from './types/Normal';

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  feu = new Feu();
  eau = new Eau();
  plante = new Plante();
  acier = new Acier();
  combat = new Combat();
  dragon = new Dragon();
  electrik = new Electrik();
  fee = new Fee();
  glace= new Glace();
  insecte = new Insecte();
  normal = new Normal();
  poison = new Poison();
  psy = new Psy();
  roche = new Roche();
  sol = new Sol();
  spectre = new Spectre();
  tenebre = new Tenebre();
  vol = new Vol();
  type = new Type();

  allTypes = new Array<Type>(this.acier, this.combat, this.dragon, this.eau, this.electrik, this.fee, this.feu, this.glace,
    this.insecte, this.normal, this.plante, this.poison, this.psy, this.roche, this.sol, this.spectre, this.tenebre, this.vol);

  finalWeakness: any;
  finalResist: any;
  finalIgnored: any;

  constructor() {
    this.initializeTypes();
  }

  initializeTypes(){
    this.acier.initializeYou([this.combat, this.feu, this.sol], [this.acier, this.dragon, this.fee, this.glace, this.insecte, this.normal, this.plante, this.psy, this.roche, this.vol], [this.poison]);
    this.combat.initializeYou([this.fee, this.psy, this.vol], [this.insecte, this.roche, this.tenebre], []);
    this.dragon.initializeYou([this.dragon, this.fee, this.glace], [this.eau, this.electrik, this.feu, this.plante], []);
    this.eau.initializeYou([this.plante, this.electrik, this.vol], [this.acier, this.eau, this.feu, this.glace], []);
    this.electrik.initializeYou([this.sol], [this.acier, this.electrik, this.vol], []);
    this.fee.initializeYou([this.acier, this.poison], [this.combat, this.insecte, this.tenebre], [this.dragon]);
    this.feu.initializeYou([this.sol, this.roche, this.eau], [this.feu, this.acier, this.fee, this.glace, this.insecte, this.plante], []);
    this.glace.initializeYou([this.acier, this.feu, this.combat, this.roche], [this.glace], []);
    this.insecte.initializeYou([this.feu, this.vol, this.roche], [this.combat, this.plante, this.sol], []);
    this.normal.initializeYou([this.combat], [], [this.spectre]);
    this.plante.initializeYou([this.feu, this.insecte, this.vol, this.glace, this.poison], [this.eau, this.electrik, this.plante, this.sol], []);
    this.poison.initializeYou([this.psy, this.sol], [this.combat, this.fee, this.insecte, this.plante, this.poison], []);
    this.psy.initializeYou([this.insecte, this.spectre, this.tenebre], [this.combat, this.psy], []);
    this.roche.initializeYou([this.acier, this.combat, this.eau, this.plante, this.sol], [this.feu, this.normal, this.poison, this.vol], []);
    this.sol.initializeYou([this.eau, this.glace, this.plante], [this.poison, this.roche], [this.electrik]);
    this.spectre.initializeYou([this.spectre, this.tenebre], [this.insecte, this.poison], [this.normal]);
    this.tenebre.initializeYou([this.combat, this.fee, this.insecte], [this.spectre, this.tenebre], [this.psy]);
    this.vol.initializeYou([this.electrik, this.glace, this.roche], [this.combat, this.insecte, this.plante], [this.sol]);
  }

  getAllTypes(){
    return this.allTypes;
  }

  getWeaknessesAndResistances(typeOne: Type, typeTwo: Type){

    let weaknessT1 = typeOne.getWeaknesses();
    let weaknessT2 = typeTwo.getWeaknesses();
    let resistT1 = typeOne.getResistances();
    let resistT2 = typeTwo.getResistances();

    let allWeakness = weaknessT1.concat(weaknessT2);
    let allResist = resistT1.concat(resistT2);

    let intersectionFromWeak = allWeakness.filter(type => allResist.indexOf(type) != -1);
    let intersectionFromResist = allResist.filter(type => allWeakness.indexOf(type) != -1);

    allWeakness = this.filteringWeaknessOrResist(allWeakness, intersectionFromResist);
    allResist = this.filteringWeaknessOrResist(allResist, intersectionFromWeak);

    this.finalWeakness = allWeakness.reduce((acc, type) => {
      acc[type.element] = (acc[type.element] || 0) + 1;
      return acc;
    },{});

    this.finalResist = allResist.reduce((acc, type) => {
      acc[type.element] = (acc[type.element] || 0) + 1;
      return acc;
    },{});

    this.finalIgnored = typeOne.getIgnored().concat(typeTwo.getIgnored()).map( type => type.getElement());
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
}

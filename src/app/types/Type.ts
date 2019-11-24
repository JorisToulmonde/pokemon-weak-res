export class Type{

  element: string;
  weaknesses: Array<Type>;
  resistances: Array<Type>;
  ignore: Array<Type>;
  icon: string;

  constructor() {
    this.element = 'Vide';
    this.weaknesses = [];
    this.resistances = [];
    this.ignore = [];
  }

  initializeYou(weaknesses, resistances, ignored){
    this.weaknesses = weaknesses;
    this.resistances = resistances;
    this.ignore = ignored;
  }

  getElement() {
    return this.element;
  }

  getWeaknesses() {
    return this.weaknesses;
  }

  getResistances() {
    return this.resistances;
  }

  getIgnored(){
    return this.ignore;
  }

}

import { Component, OnInit } from '@angular/core';
import { TypesService } from '../services/types.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import pokemonFr from '../../assets/dictionnary/pokemon-fr.json';

@Component({
  selector: 'app-input-pokemon',
  templateUrl: './input-pokemon.component.html',
  styleUrls: ['./input-pokemon.component.css']
})
export class InputPokemonComponent implements OnInit {

  myForm = new FormControl();
  pokemons: string[] = pokemonFr;
  filteredPokemon: Observable<string[]>;
  pokemon: string;

  constructor(private typesService : TypesService) { }

  ngOnInit() {
    this.filteredPokemon = this.myForm.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.pokemons.filter(pokemon => pokemon.toLowerCase().startsWith(filterValue));
  }

  onSubmit(){
    this.typesService.pokemon = this.pokemon;
    this.typesService.emitPokemonSubject();
  }

}

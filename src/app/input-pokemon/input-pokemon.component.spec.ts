import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPokemonComponent } from './input-pokemon.component';

describe('InputPokemonComponent', () => {
  let component: InputPokemonComponent;
  let fixture: ComponentFixture<InputPokemonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputPokemonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

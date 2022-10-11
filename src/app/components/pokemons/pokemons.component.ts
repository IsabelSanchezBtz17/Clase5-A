import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent  {

  public pokemon$!: Observable<any>
  
  constructor(public pokemonS: RequestService) { 
    this.pokemon$= this.pokemonS.getPokemon(); //se crea el observable
    console.log("los datos que se extraen son3: " , this.pokemonS.getPokemon())
  }



}

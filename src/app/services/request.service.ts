import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,merge} from 'rxjs';
import { combineAll, combineLatestAll, concatMap, map, tap } from 'rxjs/operators';
import Transform from '../libs/helpers/transform.helpers';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private toSearch: Observable<any>[]= [];

  constructor(public http: HttpClient) { 

  }
  
  
  getObtener(name: string) :Observable<any>{
    return this.http.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+ name).pipe(
      map( ( resp:any ) => {
        console.log(resp.drinks);
        
        return Transform.drink(resp.drinks);
      })
    )
  }

 getPokemon():Observable<any>{
    return this.http.get('https://pokeapi.co/api/v2/pokemon/pikachu').pipe(

    concatMap((resPokemon:any)=> {
        return this.getSpecies(resPokemon.species.url, resPokemon);
      }),

      concatMap( (resEspecies: any)=>{
        return this.getVarieties(resEspecies)
      }

      ),

      tap(res => {
        console.log('Tap2', res)
      }), 


      map( ( resp:any ) => {
        console.log('Maps', resp)
        return  Transform.informacionPokemon(resp)
      }),

      map( ( resp:any ) => {
        console.log('Maps despues del transform', resp)
        return  resp
      })

    )

    
     }

   /*  getPokemon(){
      return merge([this.http.get('https://pokeapi.co/api/v2/pokemon/pikachu'), this.http.get('https://pokeapi.co/api/v2/pokemon/ditto')]).pipe(
      combineLatestAll(),  
      tap(resp => {
          console.log(resp)
        })
      )
     }

*/


   getSpecies(url: string, original: any):Observable<any>{
    return this.http.get(url).pipe(
      map( (resEspecie: any) => {

        (resEspecie.varieties as any[]).forEach(
          el=> {
            this.toSearch.push(this.http.get(el.pokemon.url))
          }
        )
        console.log(this.toSearch)
        return {
          ...resEspecie, ...original
        }

      } ),

      map( ( resp:any ) => {
        console.log('Maps getSpecies', resp)
        return  resp
      })
      
      /* ,map( ( resp:any ) => {
        console.log('Maps getSpecies', resp)
        return  {
          //valores que se requieren 
        }
      })

*/


    )
   }

   getVarieties(original: any):Observable<any>{
    
    return merge(this.toSearch).pipe(
      combineLatestAll(),
      
      map( res=>{
        console.log('In variaties', res)
      
        let sprites = res.map(item=>{
          return {
            name: item.name,
            img: item.sprites.front_default
  
          }
        })

        return{
          
          ...original,
          sprites: sprites
          
        }
      })

     /* ,map( ( resp:any ) => {
        console.log('Maps getVarieties', resp)
        return  {
          sprites: resp.sprites
        }
      })

*/







      
    )

   }

}

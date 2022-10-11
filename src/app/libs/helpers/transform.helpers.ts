import { Bebida } from "../entity/bebida.interface";
import { map } from 'rxjs/operators';
import { Informacion } from "../entity/informacion.interface";

export default class Transform {

  public static drink(drinks: any[]): Bebida[] {



    let bebidas = drinks.map(drink => {

      let ingredients: string[] = [];

      Object.keys(drink).forEach(key => {
        if (key.includes('strIngredient') && drink[key]) {
          ingredients.push(drink[key])

        }
      })
      return {
        name: drink.strDrink,
        img: drink.strDrinkThumb,
        ingredients: ingredients
      };
    })

    return bebidas;

  }


  public static informacionPokemon(info: any): any {
    return {
      name: info.name,
      stats: info.stats,
      sprites: info.sprites
    }
  }


  public static informacionPokemoD(info: any): Informacion {
    return {


      name: info.name,

      stats: {
        name: info.stats.stat.name,
        valor: info.stats.base_stat
      },

      sprites: {
        name: info.sprites.name,
        imag: info.sprites.img
      }

    }
  }
}


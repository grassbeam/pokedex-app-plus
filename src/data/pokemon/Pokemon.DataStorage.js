import { Util, Log, DataStorageHelper, DataStorageType } from "../../utility";



export const STORAGE_LAST_ACTION = "LastAction";
export const STORAGE_POKE_DATA = "PokeData";
export const STORAGE_TYPE_FILTER = "PokeByType";



const PokeInitialState = {
    [STORAGE_LAST_ACTION]: null, // for logging last component updating this storage
    [STORAGE_POKE_DATA]: {  }, // pokemon data, object key using PokemonID
    [STORAGE_TYPE_FILTER]: {  }, // data format { "grass": [1,2,3,...] //PokemonID  }
}


export default function PokemonStorage(state=PokeInitialState, action) {
    if (action.type == DataStorageType.POKE_STORAGE) {
      if (action.strloc === STORAGE_POKE_DATA) {
        return {
            ...state,
            [STORAGE_LAST_ACTION]: action.payload,
            [action.strloc]: {
                ...state[action.strloc],
                ...action.value
            }
          };
      } else 
        return {
            ...state,
            [STORAGE_LAST_ACTION]: action.payload,
            [action.strloc]: action.value
        };

    } else return state;
  }





  export function getPokeIdFromDetailURL(detailURL) {
    
    if (!Util.isNullOrEmpty(detailURL)) {
      const tmparr = detailURL.split("/");
      if (!Util.isNullOrEmpty(tmparr[tmparr.length-1])) {
        return tmparr[tmparr.length-1];
      } else {
        return tmparr[tmparr.length-2];
      }
    } return 0
  }


  export function setPokemonData(data, pokeID) {

    return DataStorageHelper.CreateDispatcherObj(
        DataStorageType.POKE_STORAGE, 
        `result_of_setPokemonData(data, ${pokeID})`, STORAGE_POKE_DATA, 
        {
          [pokeID]: data,
        }
    );
  }

  export function getPokemonDataByID(props, PokeID) {
    var result = { };
    if (!Util.isNullOrUndefined(props[DataStorageType.POKE_STORAGE])) {

      if (!Util.isNullOrUndefined(props[DataStorageType.POKE_STORAGE][STORAGE_POKE_DATA])) {
        result = props[DataStorageType.POKE_STORAGE][STORAGE_POKE_DATA][PokeID];
      }
      
    } 
    return result;
  }
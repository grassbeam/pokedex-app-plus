import { Util, Log, DataStorageHelper, DataStorageType } from "../../utility";



export const STORAGE_LAST_ACTION = "LastAction";
export const STORAGE_POKE_DATA = "PokeData";
export const STORAGE_TYPE_FILTER = "PokeByType";



const PokeInitialState = {
    [STORAGE_LAST_ACTION]: null,
    [STORAGE_POKE_DATA]: {  },
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




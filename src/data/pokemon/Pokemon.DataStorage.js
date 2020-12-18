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


  export function generatePokeDataFromRemote(response) {
    return ({
        id: response.id,
        name: response.name,
        image: response.sprites.front_default,
        abilities: response.abilities,
        base_experience: response.base_experience,
        held_items: response.held_items,
        height: response.height,
        weight: response.weight,
        types: response.types.map((itm)=>({ slot: itm.slot, name: itm.type.name , url: itm.type.url})),
        stats: response.stats,
    });
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
    var result = null;
    if (!Util.isNullOrUndefined(props[DataStorageType.POKE_STORAGE])) {

      if (!Util.isNullOrUndefined(props[DataStorageType.POKE_STORAGE][STORAGE_POKE_DATA])) {
        result = props[DataStorageType.POKE_STORAGE][STORAGE_POKE_DATA][PokeID];
      }
      
    } 
    return result;
  }

  export function getPokemonStatsByID(props, PokeID) {
    const tempRawData = getPokemonDataByID(props, PokeID);
    let result = null;
    if (!Util.isNullOrUndefined(tempRawData)) {
      if (!Util.isNullOrUndefined(tempRawData.stats)) {
        result = tempRawData.stats.map((itm,idx)=>({
          point: itm.base_stat,
          title: itm.stat.name,
        }));
      }
    }
    
    return result;
  }

  export function getPokemonHeldItemByID(props, PokeID) {
    const tempRawData = getPokemonDataByID(props, PokeID);
    let result = null;
    if (!Util.isNullOrUndefined(tempRawData)) {
      if (!Util.isNullOrUndefined(tempRawData.held_items)) {
        result = tempRawData.held_items.map((itm,idx)=>({
          name: itm.item.name,
          url: itm.item.url,
          rarity: itm.version_details[0].rarity,
        }));
      }
    }
    
    return result;
  }
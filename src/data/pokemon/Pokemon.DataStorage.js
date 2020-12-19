import { Util, Log, DataStorageHelper, DataStorageType } from "../../utility";



export const STORAGE_LAST_ACTION = "LastAction";
export const STORAGE_POKE_DATA = "PokeData";
export const STORAGE_POKE_SPECIES = "PokeSpecies";



const PokeInitialState = {
    [STORAGE_LAST_ACTION]: null, // for logging last component updating this storage
    [STORAGE_POKE_DATA]: {  }, // pokemon data, object key using PokemonID
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
      } else if (action.strloc === STORAGE_POKE_SPECIES) {
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
        species: response.species,
    });
  }

  function findEnglishFlavorText(arrFlavorText) {
    var result = "";
    arrFlavorText.map(itm=>{
      if (Util.isNullOrEmpty(result) && itm.language.name.toUpperCase() == "EN") {
        result = itm.flavor_text;
      }
    });
    return result
  }

  export function generatePokeSpeciesFromRemote(response) {
    const tempFlavorText = response.flavor_text_entries;
    const extractedFlavor = !Util.isNullOrUndefined(tempFlavorText) && findEnglishFlavorText(tempFlavorText)
    return ({
      capture_rate: response.capture_rate,
      gender_rate: response.gender_rate,
      growth_rate: response.growth_rate,
      habitat: response.habitat,
      shape: response.shape,
      flavor_text: extractedFlavor,
    });
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


  export function setPokemonSpecies(data, pokeID) {

    return DataStorageHelper.CreateDispatcherObj(
        DataStorageType.POKE_STORAGE, 
        `result_of_setPokemonData(data, ${pokeID})`, STORAGE_POKE_SPECIES, 
        {
          [pokeID]: data,
        }
    );
  }


// ======= GETTER FUNCTION ======= //

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


  export function getPokemonSpeciesByID(props, PokeID) {
    var result = null;
    if (!Util.isNullOrUndefined(props[DataStorageType.POKE_STORAGE])) {

      if (!Util.isNullOrUndefined(props[DataStorageType.POKE_STORAGE][STORAGE_POKE_SPECIES])) {
        result = props[DataStorageType.POKE_STORAGE][STORAGE_POKE_SPECIES][PokeID];
      }
      
    } 
    return result;
  }

  export function getPokemonGenderRateByID(props, PokeID) {
    var result = 0; // gender_rate < 0 is genderless
    const tempDataSpecies = getPokemonSpeciesByID(props, PokeID);

    if (!Util.isNullOrUndefined(tempDataSpecies)) {
      result = tempDataSpecies.gender_rate;
    }

    return result;
  }


  export function getPokemonFlavorTextByID(props, PokeID) {
    var result = 0; // gender_rate < 0 is genderless
    const tempDataSpecies = getPokemonSpeciesByID(props, PokeID);

    if (!Util.isNullOrUndefined(tempDataSpecies)) {
      result = tempDataSpecies.flavor_text;
    }

    return result;
  }

  export function getPokemonGrowthRateByID(props, PokeID) {
    var result = null; // gender_rate < 0 is genderless
    const tempDataSpecies = getPokemonSpeciesByID(props, PokeID);

    if (!Util.isNullOrUndefined(tempDataSpecies)) {
      const tempGrowthRate = tempDataSpecies.growth_rate;
      result = !Util.isNullOrUndefined(tempGrowthRate)? tempGrowthRate.name: null;
    }

    return result;
  }

  export function getPokemonCaptureRateByID(props, PokeID) {
    var result = 0; // gender_rate < 0 is genderless
    const tempDataSpecies = getPokemonSpeciesByID(props, PokeID);

    if (!Util.isNullOrUndefined(tempDataSpecies)) {
      result = Util.isNullOrUndefined(tempDataSpecies.capture_rate)? 0 : tempDataSpecies.capture_rate;
    }

    return result;
  }


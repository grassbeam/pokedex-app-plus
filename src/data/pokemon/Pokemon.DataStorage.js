import { Util, Log, DataStorageHelper, DataStorageType } from "../../utility";



export const STORAGE_LAST_ACTION = "LastAction";
export const STORAGE_POKE_DATA = "PokeData";
export const STORAGE_POKE_SPECIES = "PokeSpecies";
export const STORAGE_POKE_COMPARE = "PokeCompareStatus";



const PokeInitialState = {
    [STORAGE_LAST_ACTION]: null, // for logging last component updating this storage
    [STORAGE_POKE_DATA]: {  }, // pokemon data, object key using PokemonID
    [STORAGE_POKE_SPECIES]: { }, // pokemon species object
    [STORAGE_POKE_COMPARE]: {  }, // index = pokemonID, value 0/1/99 => 0=failed or not found, 1=success, 99=waiting
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
      } else if (action.strloc === STORAGE_POKE_COMPARE) {
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
        moves: response.moves,
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
      base_happiness: response.base_happiness,
      egg_groups: response.egg_groups,
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


  /**
   * 
   * @param {int} status = Status code, 0=failed/not found, 1=success, 99=waiting 
   * @param {*} pokeID 
   */
  export function setStatusCompare(status, pokeID) {

    return DataStorageHelper.CreateDispatcherObj(
        DataStorageType.POKE_STORAGE, 
        `result_of_setPokemonData(data, ${pokeID})`, STORAGE_POKE_COMPARE, 
        {
          [pokeID]: status,
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


  export function getPokemonStatsObjectByID(props, PokeID) {
    const tempRawData = getPokemonDataByID(props, PokeID);
    let result = null;
    if (!Util.isNullOrUndefined(tempRawData)) {
      if (!Util.isNullOrUndefined(tempRawData.stats)) {
        var tempResult = null;
        tempRawData.stats.map((itm,idx)=>{
          if (idx == 0) tempResult = { };
          tempResult[itm.stat.name] = itm.base_stat;
        });
        result = tempResult;
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


  export function getPokemonWeight(pokeWeight=0) {
    var result = "??? kg";
    if (!Util.isNullOrEmpty(pokeWeight)) {
      if (pokeWeight > 0) {
        const weight = pokeWeight / 10 // pokeWeight in Hectogram, 1 Hectogram = 0.1 Kg
        result = `${weight} kg`;
      }
    }

    return result;
  }

  export function getPokemonHeight(pokeHeight=0) {
    var result = "??? m";

    if (!Util.isNullOrEmpty(pokeHeight)) {
      if (pokeHeight > 0) {
        const height = pokeHeight / 10 // pokeHeight in decimetres, 1 decimetres = 0.1 m
        result = `${height} m`;
      }
    }

    return result;
  }


  export function getPokemonAbilities(props, PokeID, isHidden=false) {
    const tempRawData = getPokemonDataByID(props, PokeID);
    let result = [];
    if (!Util.isNullOrUndefined(tempRawData)) {
      if (!Util.isNullOrUndefined(tempRawData.abilities)) {
        const tempresult = tempRawData.abilities.filter((itm)=> {

          if (itm.is_hidden === isHidden) {
            if (!Util.isNullOrUndefined(itm.ability)) {
              return true;
            }
          }
          return false;
        });

        result = tempresult.map(itm=>{
          return({
            name: itm.ability.name,
            url: itm.ability.url,
          });
        })
      }
    }
    return result;
  }



  export function getSpeciesEggGroupsByID(props, PokeID) {
    var result = []; 
    const tempDataSpecies = getPokemonSpeciesByID(props, PokeID);

    if (!Util.isNullOrUndefined(tempDataSpecies)) {
      result = Util.isNullOrUndefined(tempDataSpecies.egg_groups)? [] : tempDataSpecies.egg_groups;
    }

    return result;
  }

  function generatePokemonMoves(name, moveUrl, levelLearned, learnMethod, versionGroup) {
    return({
      name,
      url: moveUrl,
      levelLearned,
      learnMethod,
      versionGroup,
    });
  }

  export function getPokemonMovesByGameVersion(props, pokeID, gameVersion) {
    const tempRawData = getPokemonDataByID(props, pokeID);
    let result = [];
    if (!Util.isNullOrUndefined(tempRawData)) {
      if (!Util.isNullOrUndefined(tempRawData.moves)) {
        for (let i=0; i < tempRawData.moves.length; i++) {
          const tempdata = tempRawData.moves[i];
          const version_group_details = tempdata.version_group_details;
          const move = tempdata.move;
          var tempData = null; // null = not found

          if (!Util.isNullOrUndefined(move) && !Util.isNullOrUndefined(version_group_details)) {
            
            // ===== Start of Checking game version ===== //
            for (let j=0; j < tempdata.version_group_details.length; j++) {
              const tempgroupdetails = tempdata.version_group_details[j];

              if (!Util.isNullOrUndefined(tempgroupdetails)) {
                const level_learned_at = tempgroupdetails.level_learned_at;
                const move_learn_method = tempgroupdetails.move_learn_method;
                const version_group = tempgroupdetails.version_group

                if (!Util.isNullOrUndefined(version_group) && !Util.isNullOrUndefined(move_learn_method)) {

                  const checkname = version_group.name;
  
                  if (checkname == gameVersion) {
                      if (!Util.isNullOrUndefined(tempdata.move)) {
                        tempData = generatePokemonMoves(move.name, move.url, level_learned_at, move_learn_method.name, checkname);
                      }
                  }
                }

              }

            }
            // ===== End of Checking game version ===== //

          }

          // tempData push to result contained formatted object
          if (!Util.isNullOrUndefined(tempData)) {
            result.push(tempData);
          }

        }
      }
    }
    return result;
  }

  // result object key = level the move learned by the pokemon
  export function getPokemonLevelUpMovesByGameVersion(props, pokeID, gameVersion) {
    const pokemonMoves = getPokemonMovesByGameVersion(props, pokeID, gameVersion);
    const keyLearnMethod = "level-up";
  
    var result = { };
    // Log.debugGroup(`Check getPokemonLevelUpMovesByGameVersion pokeID=${pokeID}`, pokemonMoves);
    for (let i = 0; i < pokemonMoves.length; i++) {
      const item = pokemonMoves[i];
      if (item.learnMethod == keyLearnMethod) {
        result[item.levelLearned] = [
          ...(!Util.isNullOrUndefined(result[item.levelLearned])? result[item.levelLearned] : []),
          item
        ];
      }
    }

    return result;
  }



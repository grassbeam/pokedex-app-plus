import { Util, Log, DataStorageHelper, DataStorageType } from '../../utility';
import * as Config from '../../config';



export const STORAGE_LAST_ACTION = "LastAction";
export const STORAGE_TYPES_POKE_DATA = "PokeTypes";
export const STORAGE_TYPES_DETAIL_DATA = "PokeTypesDetail";
export const STORAGE_TYPES_GAME_VERSION = "PokeGameVersion";


const PokeInitialState = {
    [STORAGE_LAST_ACTION]: null, // for logging last component updating this storage
    [STORAGE_TYPES_POKE_DATA]: { 
        LastUpdate: new Date(),
        Data: null,
     }, // pokemon type master data, key = type ID => { type_id: { id: 123, name: "typeName", url: "url/", data: null } }
     [STORAGE_TYPES_GAME_VERSION]: {
        LastUpdate: new Date(),
        Data: null,
     }
}


export default function PokemonTypeStorage(state=PokeInitialState, action) {
    if (action.type == DataStorageType.POKE_TYPE_STORAGE) {
      if (action.strloc === STORAGE_TYPES_POKE_DATA) {
        return {
            ...state,
            [STORAGE_LAST_ACTION]: action.payload,
            [action.strloc]: {
                ...state[action.strloc],
                ...action.value
            }
          };
      } else if (action.strloc === STORAGE_TYPES_DETAIL_DATA) {
          return {
            ...state,
            [STORAGE_LAST_ACTION]: action.payload,
            [STORAGE_TYPES_POKE_DATA]: {
                ...state[STORAGE_TYPES_POKE_DATA],
                Data: {
                    ...state[STORAGE_TYPES_POKE_DATA]["Data"],
                    [action.value.Index]: {
                        ...state[STORAGE_TYPES_POKE_DATA]["Data"][action.value.Index],
                        data: action.value.Data,
                    },
                }
            }
          }
      } else if (action.strloc === STORAGE_TYPES_GAME_VERSION) {
        return {
          ...state,
          [STORAGE_LAST_ACTION]: action.payload,
          [STORAGE_TYPES_GAME_VERSION]: {
              ...state[STORAGE_TYPES_GAME_VERSION],
              ...action.value,
              
          }
        }
      } else { 
        return {
            ...state,
            [STORAGE_LAST_ACTION]: action.payload,
            [action.strloc]: action.value
        };
      }
    } else return state;
  }



// ========= SETTER DATA ========= //

/**
 * @param {object} fetchResponse = return object from API /type?limit=100&offset=0
 * 
 */
export const generateTypeMasterData = (fetchResponse) => {
    return({
        id: getTypeIdFromURL(fetchResponse.url),
        name: fetchResponse.name,
        url: fetchResponse.url,
        data: null
    });
}

/**
 * @param {object} data = return object from function generateTypeMasterData
 * 
 */
export function setPokemonTypeData(data) {
    const dispatchingData = {
        LastUpdate: new Date(),
        Data: data,
    };
    return DataStorageHelper.CreateDispatcherObj(
        DataStorageType.POKE_TYPE_STORAGE
        , `result_of_setPokemonTypeData(data[${Object.keys(data).length}])`
        , STORAGE_TYPES_POKE_DATA
        , dispatchingData
    );
}

export function generateTypeDetailDataFromResponse(response) {
    return ({
        id: response.id,
        name: response.name,
        pokemon: response.pokemon,
        damage_relations: response.damage_relations,
        move_damage_class: response.move_damage_class,
    });
}

/**
 * 
 * @param {object} data = object data
 * @param {int} typeID = type ID
 */
export function setPokemonTypeDetailData(data, typeID) {
    const dispatchingData = {
        Index: typeID,
        Data: data,
    };
    return DataStorageHelper.CreateDispatcherObj(
        DataStorageType.POKE_TYPE_STORAGE
        , `result_of_setPokemonTypeDetailData(data, typeID=${typeID})`
        , STORAGE_TYPES_DETAIL_DATA
        , dispatchingData
    );
}


/**
 * @param {Array} data = return object response from function Type.DataSource.getGameVersionTypeList
 * 
 */
export function setGameVersionData(data) {
  const dispatchingData = {
      LastUpdate: new Date(),
      Data: data,
  };
  return DataStorageHelper.CreateDispatcherObj(
      DataStorageType.POKE_TYPE_STORAGE
      , `result_of_setGameVersionData(data[${data.length}])`
      , STORAGE_TYPES_GAME_VERSION
      , dispatchingData
  );
}


// ========= GETTER DATA ========= //

/**
 * @param {string} typeURL = URL from paging API of /type
 * 
 */
  export const getTypeIdFromURL = (typeURL) => {
    if (!Util.isNullOrEmpty(typeURL)) {
        const tmparr = typeURL.split("/");
        if (!Util.isNullOrEmpty(tmparr[tmparr.length-1])) {
          return tmparr[tmparr.length-1];
        } else {
          return tmparr[tmparr.length-2];
        }
      } return -1
  }


/**
 * @param {object} props = props mapped with Storage redux
 * 
 */
  export const getTypeListData = (props) => {
    var result = null;
    if (!Util.isNullOrUndefined(props[DataStorageType.POKE_TYPE_STORAGE])) {

      if (!Util.isNullOrUndefined(props[DataStorageType.POKE_TYPE_STORAGE][STORAGE_TYPES_POKE_DATA])) {
          
        result = props[DataStorageType.POKE_TYPE_STORAGE][STORAGE_TYPES_POKE_DATA].Data;

        if (!Util.isNullOrUndefined(result)) {
            result = Object.values(result);
        } else result = null;
      }
      
    } 
    return result;
  }


/**
 * @param {object} props = props mapped with Storage redux
 * @param {string} storeLocation = string location name, ex: STORAGE_TYPES_POKE_DATA value
 * 
 */
  export const checkDataNeedUpdate = (props, storeLocation) => {
      let result = true;
      if (!Util.isNullOrUndefined(props[DataStorageType.POKE_TYPE_STORAGE])) {
        if (!Util.isNullOrUndefined(props[DataStorageType.POKE_TYPE_STORAGE][storeLocation])) {

            if (!Util.isNullOrUndefined(props[DataStorageType.POKE_TYPE_STORAGE][storeLocation]["LastUpdate"])) {
                let tempLastDate = props[DataStorageType.POKE_TYPE_STORAGE][storeLocation]["LastUpdate"];
                let tempNowDate = new Date();
                const dateDiff = parseInt((tempNowDate-tempLastDate)/(3600*1000)); // date Diff in hours
                result = !!(dateDiff >= Config.LAST_UPDATE_INTERVAL);
            }
        }
      }
      return result;
  }


/**
 * @param {object} props = props mapped with Storage redux
 * @param {int} typeID = ID type
 * 
 * return object formatted from function generateTypeMasterData
 */
  export const getTypeInfoByID = (props, typeID) => {
    var result = null;
    if (!Util.isNullOrUndefined(props[DataStorageType.POKE_TYPE_STORAGE])) {

      if (!Util.isNullOrUndefined(props[DataStorageType.POKE_TYPE_STORAGE][STORAGE_TYPES_POKE_DATA])) {
          
        const tempData = props[DataStorageType.POKE_TYPE_STORAGE][STORAGE_TYPES_POKE_DATA].Data;

        if (!Util.isNullOrUndefined(tempData)) {
            result = tempData[typeID];
        } 

      }
      
    } 
    return result;
  }


  export const generateTypeDataPokemon = (data, limit=0, offset=0) => {

    if (!Util.isNullOrUndefined(data)) {
        var tempLimit = offset + limit;
        if (tempLimit > data.length || limit == 0) {
            tempLimit = data.length;
        } 
        var tempResult = [];
        for (let idx = offset; idx < tempLimit; idx++) {
            const element = data[idx];
            tempResult.push({
                name: element.pokemon.name,
                url: element.pokemon.url,
            });
        }
        return tempResult;
      } else return null;
  }

/**
 * @param {object} props = props mapped with Storage redux
 * @param {int} typeID = ID type
 * 
 * return array of Pokemon info object (only ID, name, and url)
 */
export const getTypeDataPokemonByID = (props, typeID, limit=0, offset=0) =>{
    var result = null;
    const typeInfoData = getTypeInfoByID(props, typeID);
    if (!Util.isNullOrUndefined(typeInfoData)) {
        if (!Util.isNullOrUndefined(typeInfoData.data)) {
            const tempPokemonArr = typeInfoData.data.pokemon;
            result = generateTypeDataPokemon(tempPokemonArr, limit, offset);
        }
    }

    return result;
}

/**
 * @param {object} props = props mapped with Storage redux
 * @param {int} typeID = ID type
 * 
 * return array length of pokemon by type
 */
export const countTypeDataPokemonByID = (props, typeID, limit=0, offset=0) =>{
    var result = 0;
    const typeInfoData = getTypeInfoByID(props, typeID);
    if (!Util.isNullOrUndefined(typeInfoData)) {
        if (!Util.isNullOrUndefined(typeInfoData.data)) {
            result = typeInfoData.data.pokemon.length;
        }
    }

    return result;
}



export const getTypeGameVersion = (props) => {
  var result = null;
  if (!Util.isNullOrUndefined(props[DataStorageType.POKE_TYPE_STORAGE])) {

    if (!Util.isNullOrUndefined(props[DataStorageType.POKE_TYPE_STORAGE][STORAGE_TYPES_GAME_VERSION])) {
        
      result = props[DataStorageType.POKE_TYPE_STORAGE][STORAGE_TYPES_GAME_VERSION]["Data"];
    }
    
  } 
  return result;
}



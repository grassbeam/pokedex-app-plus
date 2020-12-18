import PokeStorage from "./pokemon/Pokemon.DataStorage.js";
import DataStorageType from '../utility/constant/DataStorageType.js';

let ReducerStorage;
export default ReducerStorage = {
  [DataStorageType.POKE_STORAGE]: PokeStorage,
};


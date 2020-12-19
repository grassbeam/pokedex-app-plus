import PokeStorage from "./pokemon/Pokemon.DataStorage";
import PokeTypeStorage from './types/Types.DataStorage';

import DataStorageType from '../utility/constant/DataStorageType';

let ReducerStorage= {
  [DataStorageType.POKE_STORAGE]: PokeStorage,
  [DataStorageType.POKE_TYPE_STORAGE]: PokeTypeStorage,
};

export default ReducerStorage ;


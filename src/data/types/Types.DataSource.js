import axios from 'axios';
import * as Config from '../../config';
import { Util } from '../../utility';






export const getPokemonTypesList = () => axios.get(`${Config.BASE_API}${Config.API_VERSION}/type/?limit=100&offset=0`);

export const getPokemonTypeByID = (typeID) => axios.get(`${Config.BASE_API}${Config.API_VERSION}/type/${typeID}`);



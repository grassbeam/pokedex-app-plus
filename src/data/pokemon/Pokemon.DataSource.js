import axios from 'axios';
import * as Config from '../../config';
import { Util } from '../../utility';




export const getListPokemon = async (pageSize, overrideURL="") => {
    var requestURL = "";
    
    // Check if there is next page url available
    if (Util.isNullOrEmpty(overrideURL)) {
        requestURL = `${Config.BASE_API}${Config.API_VERSION}/pokemon?limit=${pageSize}&offset=0`;
    } else requestURL = overrideURL;



    return axios.get(requestURL);
}


export const getDetailPokemonByURL = async (detailURL) => axios.get(detailURL);

export const getDetailPokemonByID = async (pokeID) => axios.get(`${Config.BASE_API}${Config.API_VERSION}/pokemon/${pokeID}`);

export const getSpeciesPokemonByID = async (pokeID) => axios.get(`${Config.BASE_API}${Config.API_VERSION}/pokemon-species/${pokeID}`);

export const getDetailAndSpeciesPokemonByID = async (pokeID) => {
    return axios.all([getDetailPokemonByID(pokeID), getSpeciesPokemonByID(pokeID) ]).then(axios.spread((...responses) =>  ({ PokeData: responses[0], PokeSpecies: responses[1], })));
}

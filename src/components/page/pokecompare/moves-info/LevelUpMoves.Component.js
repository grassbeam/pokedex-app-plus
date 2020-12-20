import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { CompareDataWrapper, NameListWrapper } from '../compare-wrapper/CompareWrapper.Component';
import PokeGender from '../../../pokemon-detail/poke-gender/PokeGender.Component';

import { Util, Log, DataStorageType } from '../../../../utility';

import * as PokeStorage from '../../../../data/pokemon/Pokemon.DataStorage';



function LevelUpMovesComponent(props) {



    const { tableCellInfoClassName, tableCellClassName, ArrPokeID, GameVersionType } = props;


    const data = Array.from({ length: ArrPokeID.length }, () => ({ PokeID:"", PokeData: null, PokeSpecies: null, PokeMoves: null }));

    var LevelPokeMoves = []; // array of level from PokeMoves Object.keys

    for (let i = 0; i < ArrPokeID.length; i++) {
        const pokeID = ArrPokeID[i];
        const tempData = data[i];
        if (!Util.isNullOrEmpty(pokeID)) {
            const PokeData =  PokeStorage.getPokemonDataByID(props, pokeID);
            const PokeSpecies = PokeStorage.getPokemonSpeciesByID(props, pokeID);
            tempData.PokeID = pokeID;
            tempData.PokeData = PokeData;
            tempData.PokeSpecies = PokeSpecies;

            if (!Util.isNullOrUndefined(PokeData)) {
                // Generate PokeMoves
                const pokeMovesByLevel = PokeStorage.getPokemonLevelUpMovesByGameVersion(props, pokeID, GameVersionType);
                tempData.PokeMoves = pokeMovesByLevel;
                const arrLevelMoves = Object.keys(pokeMovesByLevel);
                if (LevelPokeMoves.length < 1) {
                    LevelPokeMoves = arrLevelMoves;
                } else {
                    const tempLevelPokeMoves = [...new Set([...LevelPokeMoves,...arrLevelMoves])];
                    LevelPokeMoves = tempLevelPokeMoves;
                }
            }

            data[i] = tempData;
        }


        if (i == (ArrPokeID.length - 1) && LevelPokeMoves.length > 0) {
            // Sort the level on Last Pokemon data
            LevelPokeMoves.sort(function(x, y) {
                const tmpX = parseInt(x);
                const tmpY = parseInt(y);
                if (tmpX < tmpY) {
                  return -1;
                }
                if (tmpX > tmpY) {
                  return 1;
                }
                return 0;
              });
        }
    }


    return(
        <>
            {
                LevelPokeMoves.map((level, idxLevel)=>(
                    <TableRow key={`compare-moves-level-${idxLevel}`} role="checkbox" tabIndex={-1} >
                        <TableCell className={tableCellInfoClassName} align="left">
                            { `Level ${level}` }
                        </TableCell>
                        {
                            data.map((itm,idx)=> (
                                <CompareDataWrapper key={`compare-moves-level-${idxLevel}-poke-${idx}`} Item={itm} tableCellClassName={tableCellClassName} >
                                    {
                                        !Util.isNullOrEmpty(itm.PokeID) && !Util.isNullOrUndefined(itm.PokeMoves)?
                                        !Util.isNullOrUndefined(itm.PokeMoves[level])?<NameListWrapper data={itm.PokeMoves[level]} variant="caption"/>:""
                                        :""
                                    }
                                </CompareDataWrapper>
                            ))
                        }
                    </TableRow>
                ))
            }
        </>
    );
}


const mapStateToProps = (state) => ({
    [DataStorageType.POKE_STORAGE] : state[DataStorageType.POKE_STORAGE],
});

export default connect(mapStateToProps)(LevelUpMovesComponent);


LevelUpMovesComponent.propTypes = {
    tableCellClassName: PropTypes.string,
    tableCellInfoClassName: PropTypes.string,
    ArrPokeID: PropTypes.arrayOf(PropTypes.string).isRequired,
    GameVersionType: PropTypes.string.isRequired,
};

LevelUpMovesComponent.defaultProps = {
    tableCellClassName: '',
    tableCellInfoClassName: '',
};
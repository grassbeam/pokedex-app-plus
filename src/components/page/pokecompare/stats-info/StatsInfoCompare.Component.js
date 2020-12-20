import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { CompareDataWrapper } from '../compare-wrapper/CompareWrapper.Component';

import { Util, Log, DataStorageType } from '../../../../utility';

import * as PokeStorage from '../../../../data/pokemon/Pokemon.DataStorage';



function StatsInfoCompareComponent(props) {


    const { tableCellInfoClassName, tableCellClassName, ArrPokeID } = props;


    const data = Array.from({ length: ArrPokeID.length }, () => ({ PokeID:"", PokeData: null, PokeSpecies: null, PokeStats: null }));

    var StatsKey = null

    for (let i = 0; i < ArrPokeID.length; i++) {
        const pokeID = ArrPokeID[i];
        const tempData = data[i];
        if (!Util.isNullOrEmpty(pokeID)) {
            const PokeData =  PokeStorage.getPokemonDataByID(props, pokeID);
            const PokeSpecies = PokeStorage.getPokemonSpeciesByID(props, pokeID);
            tempData.PokeID = pokeID;
            tempData.PokeData = PokeData;
            tempData.PokeSpecies = PokeSpecies;

            if (!Util.isNullOrUndefined(PokeData) && Util.isNullOrUndefined(tempData.PokeStats)) {
                // Mapping stats by Key
                const tmpStats = PokeStorage.getPokemonStatsObjectByID(props, pokeID);
                tempData.PokeStats = tmpStats;
                
                if (Util.isNullOrUndefined(StatsKey) && !Util.isNullOrUndefined(tmpStats)) {
                    StatsKey = Object.keys(tmpStats);
                }
            }

            data[i] = tempData;
        }
    }


    return(
        <>
            <TableRow role="checkbox" tabIndex={-1} >
                <TableCell className={tableCellInfoClassName} align="left">
                    Hp
                </TableCell>
                {
                    data.map((itm,idx)=> (
                        <CompareDataWrapper key={`compare-type-${idx}`} Item={itm} tableCellClassName={tableCellClassName} >
                            {
                                !Util.isNullOrEmpty(itm.PokeID) && !Util.isNullOrUndefined(itm.PokeStats)?
                                Util.isNullOrEmpty(itm.PokeStats["hp"])?"":itm.PokeStats["hp"]
                                :""
                            }
                        </CompareDataWrapper>
                    ))
                }
            </TableRow>
            <TableRow role="checkbox" tabIndex={-1} >
                <TableCell className={tableCellInfoClassName} align="left">
                    Attack
                </TableCell>
                {
                    data.map((itm,idx)=> (
                        <CompareDataWrapper key={`compare-type-${idx}`} Item={itm} tableCellClassName={tableCellClassName} >
                            {
                                !Util.isNullOrEmpty(itm.PokeID) && !Util.isNullOrUndefined(itm.PokeStats)?
                                Util.isNullOrEmpty(itm.PokeStats["hp"])?"":itm.PokeStats["hp"]
                                :""
                            }
                        </CompareDataWrapper>
                    ))
                }
            </TableRow>
            <TableRow role="checkbox" tabIndex={-1} >
                <TableCell className={tableCellInfoClassName} align="left">
                    Hp
                </TableCell>
                {
                    data.map((itm,idx)=> (
                        <CompareDataWrapper key={`compare-type-${idx}`} Item={itm} tableCellClassName={tableCellClassName} >
                            {
                                !Util.isNullOrEmpty(itm.PokeID) && !Util.isNullOrUndefined(itm.PokeStats)?
                                Util.isNullOrEmpty(itm.PokeStats["attack"])?"":itm.PokeStats["attack"]
                                :""
                            }
                        </CompareDataWrapper>
                    ))
                }
            </TableRow>
            <TableRow role="checkbox" tabIndex={-1} >
                <TableCell className={tableCellInfoClassName} align="left">
                    Defense
                </TableCell>
                {
                    data.map((itm,idx)=> (
                        <CompareDataWrapper key={`compare-type-${idx}`} Item={itm} tableCellClassName={tableCellClassName} >
                            {
                                !Util.isNullOrEmpty(itm.PokeID) && !Util.isNullOrUndefined(itm.PokeStats)?
                                Util.isNullOrEmpty(itm.PokeStats["defense"])?"":itm.PokeStats["defense"]
                                :""
                            }
                        </CompareDataWrapper>
                    ))
                }
            </TableRow>
            <TableRow role="checkbox" tabIndex={-1} >
                <TableCell className={tableCellInfoClassName} align="left">
                    Special Attack
                </TableCell>
                {
                    data.map((itm,idx)=> (
                        <CompareDataWrapper key={`compare-type-${idx}`} Item={itm} tableCellClassName={tableCellClassName} >
                            {
                                !Util.isNullOrEmpty(itm.PokeID) && !Util.isNullOrUndefined(itm.PokeStats)?
                                Util.isNullOrEmpty(itm.PokeStats["special-attack"])?"":itm.PokeStats["special-attack"]
                                :""
                            }
                        </CompareDataWrapper>
                    ))
                }
            </TableRow>
            <TableRow role="checkbox" tabIndex={-1} >
                <TableCell className={tableCellInfoClassName} align="left">
                    Special Defense
                </TableCell>
                {
                    data.map((itm,idx)=> (
                        <CompareDataWrapper key={`compare-type-${idx}`} Item={itm} tableCellClassName={tableCellClassName} >
                            {
                                !Util.isNullOrEmpty(itm.PokeID) && !Util.isNullOrUndefined(itm.PokeStats)?
                                Util.isNullOrEmpty(itm.PokeStats["special-defense"])?"":itm.PokeStats["special-defense"]
                                :""
                            }
                        </CompareDataWrapper>
                    ))
                }
            </TableRow>
            <TableRow role="checkbox" tabIndex={-1} >
                <TableCell className={tableCellInfoClassName} align="left">
                    Speed
                </TableCell>
                {
                    data.map((itm,idx)=> (
                        <CompareDataWrapper key={`compare-type-${idx}`} Item={itm} tableCellClassName={tableCellClassName} >
                            {
                                !Util.isNullOrEmpty(itm.PokeID) && !Util.isNullOrUndefined(itm.PokeStats)?
                                Util.isNullOrEmpty(itm.PokeStats["speed"])?"":itm.PokeStats["speed"]
                                :""
                            }
                        </CompareDataWrapper>
                    ))
                }
            </TableRow>
        </>
    );
}


const mapStateToProps = (state) => ({
    [DataStorageType.POKE_STORAGE] : state[DataStorageType.POKE_STORAGE],
});

export default connect(mapStateToProps)(StatsInfoCompareComponent);


StatsInfoCompareComponent.propTypes = {
    tableCellClassName: PropTypes.string,
    tableCellInfoClassName: PropTypes.string,
    ArrPokeID: PropTypes.arrayOf(PropTypes.string).isRequired,
};

StatsInfoCompareComponent.defaultProps = {
    tableCellClassName: '',
    tableCellInfoClassName: '',
};
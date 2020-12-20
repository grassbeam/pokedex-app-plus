import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

import PokeTypeList from '../../../pokemon-detail/poke-types/PokeTypeList.Component';
import { TableCellDataWrapper, CompareDataWrapper, AbilitiesWrapper } from '../compare-wrapper/CompareWrapper.Component';

import { Util, Log, DataStorageType } from '../../../../utility';

import * as PokeStorage from '../../../../data/pokemon/Pokemon.DataStorage';


function BasicInfoComponent(props) {

    const { tableCellInfoClassName, tableCellClassName, ArrPokeID } = props;


    const data = Array.from({ length: ArrPokeID.length }, () => ({ PokeID:"", PokeData: null, PokeSpecies: null }));


    for (let i = 0; i < ArrPokeID.length; i++) {
        const pokeID = ArrPokeID[i];
        const tempData = data[i];
        if (!Util.isNullOrEmpty(pokeID)) {
            const PokeData =  PokeStorage.getPokemonDataByID(props, pokeID);
            const PokeSpecies = PokeStorage.getPokemonSpeciesByID(props, pokeID);
            tempData.PokeID = pokeID;
            tempData.PokeData = PokeData;
            tempData.PokeSpecies = PokeSpecies;
            data[i] = tempData;
        }
    }


    return(
        <>
            <TableRow role="checkbox" tabIndex={-1} >
                <TableCell className={tableCellInfoClassName} align="left">
                    Type
                </TableCell>
                {
                    data.map((itm,idx)=> (
                        <CompareDataWrapper key={`compare-type-${idx}`} Item={itm} tableCellClassName={tableCellClassName} >
                            {
                                !Util.isNullOrEmpty(itm.PokeID) && !Util.isNullOrUndefined(itm.PokeData)?
                                <Box alignItems="center" style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '50%'}}>
                                    <PokeTypeList
                                        ListPokeType={itm.PokeData.types}
                                    />
                                </Box>
                                :""
                            }
                        </CompareDataWrapper>
                    ))
                }
            </TableRow>
            <TableRow role="checkbox" tabIndex={-1} >
                <TableCell className={tableCellInfoClassName} align="left">
                    Abilities
                </TableCell>
                {
                    data.map((itm,idx)=>(
                        <CompareDataWrapper key={`compare-type-${idx}`} Item={itm} tableCellClassName={tableCellClassName} >
                            {
                                !Util.isNullOrEmpty(itm.PokeID) && !Util.isNullOrUndefined(itm.PokeData)?
                                <AbilitiesWrapper AbilitiesData={PokeStorage.getPokemonAbilities(props, itm.PokeID, false)} />
                                :""
                            }
                        </CompareDataWrapper>
                    ))
                }
            </TableRow>
            <TableRow role="checkbox" tabIndex={-1} >
                <TableCell className={tableCellInfoClassName} align="left">
                    Hidden Ability
                </TableCell>
                {
                    data.map((itm,idx)=>(
                        <CompareDataWrapper key={`compare-type-${idx}`} Item={itm} tableCellClassName={tableCellClassName} >
                            {
                                !Util.isNullOrEmpty(itm.PokeID) && !Util.isNullOrUndefined(itm.PokeData)?
                                <AbilitiesWrapper AbilitiesData={PokeStorage.getPokemonAbilities(props, itm.PokeID, true)} />
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

export default connect(mapStateToProps)(BasicInfoComponent);


BasicInfoComponent.propTypes = {
    tableCellClassName: PropTypes.string,
    tableCellInfoClassName: PropTypes.string,
    ArrPokeID: PropTypes.arrayOf(PropTypes.string).isRequired,
};

BasicInfoComponent.defaultProps = {
    tableCellClassName: '',
    tableCellInfoClassName: '',
};


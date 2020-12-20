import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { CompareDataWrapper, NameListWrapper } from '../compare-wrapper/CompareWrapper.Component';
import PokeGender from '../../../pokemon-detail/poke-gender/PokeGender.Component';

import { Util, DataStorageType } from '../../../../utility';

import * as PokeStorage from '../../../../data/pokemon/Pokemon.DataStorage';



function FlavorInfoComponent(props) {


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
                    Height
                </TableCell>
                {
                    data.map((itm,idx)=> (
                        <CompareDataWrapper key={`compare-type-${idx}`} Item={itm} tableCellClassName={tableCellClassName} >
                            {
                                !Util.isNullOrEmpty(itm.PokeID) && !Util.isNullOrUndefined(itm.PokeData)?
                                PokeStorage.getPokemonHeight(itm.PokeData.height)
                                :""
                            }
                        </CompareDataWrapper>
                    ))
                }
            </TableRow>
            <TableRow role="checkbox" tabIndex={-1} >
                <TableCell className={tableCellInfoClassName} align="left">
                    Weight
                </TableCell>
                {
                    data.map((itm,idx)=> (
                        <CompareDataWrapper key={`compare-type-${idx}`} Item={itm} tableCellClassName={tableCellClassName} >
                            {
                                !Util.isNullOrEmpty(itm.PokeID) && !Util.isNullOrUndefined(itm.PokeData)?
                                PokeStorage.getPokemonWeight(itm.PokeData.weight)
                                :""
                            }
                        </CompareDataWrapper>
                    ))
                }
            </TableRow>
            <TableRow role="checkbox" tabIndex={-1} >
                <TableCell className={tableCellInfoClassName} align="left">
                    Habitat
                </TableCell>
                {
                    data.map((itm,idx)=> (
                        <CompareDataWrapper key={`compare-type-${idx}`} Item={itm} tableCellClassName={tableCellClassName} >
                            {
                                !Util.isNullOrEmpty(itm.PokeID) && !Util.isNullOrUndefined(itm.PokeSpecies)?
                                <NameListWrapper data={[itm.PokeSpecies.habitat]} variant="caption" />
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

export default connect(mapStateToProps)(FlavorInfoComponent);


FlavorInfoComponent.propTypes = {
    tableCellClassName: PropTypes.string,
    tableCellInfoClassName: PropTypes.string,
    ArrPokeID: PropTypes.arrayOf(PropTypes.string).isRequired,
};

FlavorInfoComponent.defaultProps = {
    tableCellClassName: '',
    tableCellInfoClassName: '',
};
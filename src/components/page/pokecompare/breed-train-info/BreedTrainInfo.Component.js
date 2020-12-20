import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { CompareDataWrapper, NameListWrapper } from '../compare-wrapper/CompareWrapper.Component';
import PokeGender from '../../../pokemon-detail/poke-gender/PokeGender.Component';

import { Util, DataStorageType } from '../../../../utility';

import * as PokeStorage from '../../../../data/pokemon/Pokemon.DataStorage';



function BreedTrainInfoComponent(props) {


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
                    Egg Groups
                </TableCell>
                {
                    data.map((itm,idx)=> (
                        <CompareDataWrapper key={`compare-type-${idx}`} Item={itm} tableCellClassName={tableCellClassName} >
                            {
                                !Util.isNullOrEmpty(itm.PokeID) && !Util.isNullOrUndefined(itm.PokeSpecies)?
                                <NameListWrapper data={PokeStorage.getSpeciesEggGroupsByID(props, itm.PokeID)} />
                                :""
                            }
                        </CompareDataWrapper>
                    ))
                }
            </TableRow>
            <TableRow role="checkbox" tabIndex={-1} >
                <TableCell className={tableCellInfoClassName} align="left">
                    Gender
                </TableCell>
                {
                    data.map((itm,idx)=> (
                        <CompareDataWrapper key={`compare-type-${idx}`} Item={itm} tableCellClassName={tableCellClassName} >
                            {
                                !Util.isNullOrEmpty(itm.PokeID) && !Util.isNullOrUndefined(itm.PokeSpecies)?
                                <PokeGender
                                    PokeGenderRate={PokeStorage.getPokemonGenderRateByID(props, itm.PokeID)}
                                />
                                :""
                            }
                        </CompareDataWrapper>
                    ))
                }
            </TableRow>
            <TableRow role="checkbox" tabIndex={-1} >
                <TableCell className={tableCellInfoClassName} align="left">
                    Base EXP
                </TableCell>
                {
                    data.map((itm,idx)=> (
                        <CompareDataWrapper key={`compare-type-${idx}`} Item={itm} tableCellClassName={tableCellClassName} >
                            {
                                !Util.isNullOrEmpty(itm.PokeID) && !Util.isNullOrUndefined(itm.PokeData)?
                                Util.isNullOrEmpty(itm.PokeData.base_experience)?"":itm.PokeData.base_experience
                                :""
                            }
                        </CompareDataWrapper>
                    ))
                }
            </TableRow>
            <TableRow role="checkbox" tabIndex={-1} >
                <TableCell className={tableCellInfoClassName} align="left">
                    Base Happiness
                </TableCell>
                {
                    data.map((itm,idx)=> (
                        <CompareDataWrapper key={`compare-type-${idx}`} Item={itm} tableCellClassName={tableCellClassName} >
                            {
                                !Util.isNullOrEmpty(itm.PokeID) && !Util.isNullOrUndefined(itm.PokeSpecies)?
                                Util.isNullOrEmpty(itm.PokeSpecies.base_happiness)?"":itm.PokeSpecies.base_happiness
                                :""
                            }
                        </CompareDataWrapper>
                    ))
                }
            </TableRow>
            <TableRow role="checkbox" tabIndex={-1} >
                <TableCell className={tableCellInfoClassName} align="left">
                    Capture Rate
                </TableCell>
                {
                    data.map((itm,idx)=> (
                        <CompareDataWrapper key={`compare-type-${idx}`} Item={itm} tableCellClassName={tableCellClassName} >
                            {
                                !Util.isNullOrEmpty(itm.PokeID) && !Util.isNullOrUndefined(itm.PokeSpecies)?
                                Util.isNullOrEmpty(itm.PokeSpecies.capture_rate)?"":itm.PokeSpecies.capture_rate
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

export default connect(mapStateToProps)(BreedTrainInfoComponent);


BreedTrainInfoComponent.propTypes = {
    tableCellClassName: PropTypes.string,
    tableCellInfoClassName: PropTypes.string,
    ArrPokeID: PropTypes.arrayOf(PropTypes.string).isRequired,
};

BreedTrainInfoComponent.defaultProps = {
    tableCellClassName: '',
    tableCellInfoClassName: '',
};
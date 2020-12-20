import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


import {  CompareDataWrapper } from '../compare-wrapper/CompareWrapper.Component';

import { Util, Log, DataStorageType } from '../../../../utility';
import * as PokeStorage from '../../../../data/pokemon/Pokemon.DataStorage';


const useStyles = makeStyles((theme) => ({
    avatarLarge: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
  }));


function HeaderSubComponent(props) {

    const classes = useStyles();
    const { tableRowClassName, tableCellClassName, ArrPokeID } = props;

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

    const handleUrlClick = (clickedPokeID) => props.history.push(`/detail/${clickedPokeID}`);


    return(
        <>
            <TableRow className={tableRowClassName}>
                <TableCell className={tableCellClassName} align="center">
                </TableCell>
                {
                    data.map((itm,idx)=> (
                        <CompareDataWrapper key={`compare-type-${idx}`} Item={itm} tableCellClassName={tableCellClassName} >
                            {
                                !Util.isNullOrEmpty(itm.PokeID) && !Util.isNullOrUndefined(itm.PokeData)?      
                                <Link href="#" onClick={()=>handleUrlClick(itm.PokeID)} variant="body2">
                                    <Avatar alt={itm.PokeData.name} src={ itm.PokeData.image } className={classes.avatarLarge} />
                                    <Typography color="textPrimary" variant="body1" style={{ textTransform: 'capitalize', textDecoration: 'underline', }}>{ itm.PokeData.name }</Typography>
                                    
                                </Link>
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

export default withRouter(connect(mapStateToProps)(HeaderSubComponent));


HeaderSubComponent.propTypes = {
    tableCellClassName: PropTypes.string,
    tableRowClassName: PropTypes.string,
};

HeaderSubComponent.defaultProps = {
    tableCellClassName: '',
    tableRowClassName: '',
};
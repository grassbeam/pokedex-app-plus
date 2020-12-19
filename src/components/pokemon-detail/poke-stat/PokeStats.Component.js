import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Util, DataStorageType } from '../../../utility';
import { withRouter } from "react-router-dom";
import PokeStatsPoint from './PokeStats.Point.Component';
import PokeStatsSkeleton from './PokeStats.Skeleton';

import * as PokeStorage from '../../../data/pokemon/Pokemon.DataStorage';



const useStyles = makeStyles((theme) => (
    {
        root: {
        //   maxWidth: 345,
            height: '100%',
        },
        btnLeft: {
            marginLeft: 'auto',
            padding: theme.spacing(2),
        },
    }
));


function PokeStatsDetail(props) {

    const classes = useStyles();
    const { PokemonID } = props;

    const PokeStatsData = PokeStorage.getPokemonStatsByID(props, PokemonID);

    if (Util.isNullOrUndefined(PokeStatsData)) {
        return (
            <PokeStatsSkeleton/>
        );
    }

    return (
        <>
            <Grid container spacing={2} >
                {
                    PokeStatsData.map((pokeStatsData,idx) =>(
                        <Grid item sm={2} xs={4}   key={`poke-stats-data-${idx}`}> 
                            <PokeStatsPoint 
                                Point={ pokeStatsData.point }
                                Title={ pokeStatsData.title }
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </>
    );
}
const mapStateToProps = (state) => ({
    [DataStorageType.POKE_STORAGE] : state[DataStorageType.POKE_STORAGE],
});

export default withRouter(connect(mapStateToProps)(PokeStatsDetail));

PokeStatsDetail.propTypes = {
    PokemonID: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
};




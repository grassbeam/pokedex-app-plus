import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Util, Log, DataStorageType } from '../../../utility';
import { withRouter } from "react-router-dom";

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
            <>
                <h3>Loading...</h3>
            </>
        );
    }

    return (
        <>
            <Grid container spacing={2} >
                {
                    PokeStatsData.map((pokeStatsData,idx) =>(
                        <Grid item sm={2} xs={4}   key={`poke-stats-data-${idx}`}> 
                            <PokeStatsItem 
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




function PokeStatsItem(props) {

    const { Point, Title } = props;

    const tempIntPoint = parseInt(Point);

    const powerHeight = Math.ceil(tempIntPoint/15);

    const powerLeft = 15-powerHeight;


    const powerHeightComp = []
    for (let i = 0; i< powerHeight; i++) {
        powerHeightComp.push(
            <div style={{ border: '1px solid blue', backgroundColor: 'blue', padding: '5px', marginTop: '3px'}}  key={`power-height-comp-${i}`}>

            </div>
        );
    }
    const powerLeftComp = []
    for (let i = 0; i< powerLeft; i++) {
        powerLeftComp.push(
            <div style={{ border: '1px solid #000000', backgroundColor: '#F0F0F0', padding: '5px', marginTop: '3px'}} key={`power-left-comp-${i}`}>

            </div>
        );
    }

    return(
        <Box>
            { powerLeftComp }
            { powerHeightComp }

            
            <Typography variant="body2" gutterBottom style={{ textTransform: 'uppercase', textAlign: 'center' }}>
                { Title }
            </Typography>
        </Box>
    );
}
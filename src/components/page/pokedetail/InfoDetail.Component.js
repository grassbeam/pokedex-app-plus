import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Util, Log, DataStorageType } from '../../../utility';
import ListPokeDataItemSkeleton from '../../page/pokedata/list-data/ListData.Item.Skeleton';
import PokeGender from '../../pokemon-detail/poke-gender/PokeGender.Component';
import PokeItemHeldData from '../../pokemon-detail/poke-items-held/PokeItemsHeld.Component';
import InfoDetailSkeleton from './InfoDetail.Skeleton';

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
        textContent: {
            textTransform: 'capitalize',
        },
    }
));
  
  

 function InfoDetailPoke(props) {

    const classes = useStyles();
    const { PokemonID } = props;

    const storagePokeData = PokeStorage.getPokemonDataByID(props, PokemonID);
    const speciesPokeData = PokeStorage.getPokemonSpeciesByID(props, PokemonID);


    const pokeItemHeldData = PokeStorage.getPokemonHeldItemByID(props, PokemonID);
    const pokeGenderRate = PokeStorage.getPokemonGenderRateByID(props, PokemonID);
    const pokeGrowthRate = PokeStorage.getPokemonGrowthRateByID(props, PokemonID);
    const pokeCaptureRate = PokeStorage.getPokemonCaptureRateByID(props, PokemonID);
    const pokeTextFlavor = PokeStorage.getPokemonFlavorTextByID(props, PokemonID);


    const dataClickHandler = (pokeID) => {
      Log.debugStr(`Clicked PokeID = ${pokeID}`);
      props.history.push(`/detail/${storagePokeData.id}`);
    }

    if (Util.isNullOrUndefined(storagePokeData) || Util.isNullOrUndefined(speciesPokeData)) {
        return (<InfoDetailSkeleton/>);
    } else {
        return(
            <Card className={classes.root}>
                <CardContent>
                    <Grid container spacing={2} >
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                Height
                            </Typography>
                            <Typography className={classes.textContent} variant="body2" gutterBottom>
                                {storagePokeData.height}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                Weight
                            </Typography>
                            <Typography className={classes.textContent} variant="body2" gutterBottom>
                                {storagePokeData.weight}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                Body Shape
                            </Typography>
                            <Typography className={classes.textContent} variant="body2" gutterBottom>
                                {speciesPokeData.shape.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                Habitat
                            </Typography>
                            <Typography className={classes.textContent} variant="body2" gutterBottom>
                                {speciesPokeData.habitat.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                Gender
                            </Typography>
                            <Typography className={classes.textContent} variant="body2" gutterBottom>
                                <PokeGender
                                    PokeGenderRate={pokeGenderRate}
                                />
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                Items Held
                            </Typography>
                            <PokeItemHeldData
                                PokeItemHeldData={pokeItemHeldData}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                Growth Rate
                            </Typography>
                            <Typography className={classes.textContent} variant="body2" gutterBottom>
                                { !Util.isNullOrEmpty(pokeGrowthRate) && pokeGrowthRate }
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                Capture Rate
                            </Typography>
                            <Typography className={classes.textContent} variant="body2" gutterBottom>
                                { `${pokeCaptureRate} / 255`}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom>
                                Story
                            </Typography>
                            <Typography className={classes.textContent} variant="body2" gutterBottom>
                                { Util.isNullOrEmpty(speciesPokeData.flavor_text)?"-":speciesPokeData.flavor_text }
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    
                </CardActions>
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
    [DataStorageType.POKE_STORAGE] : state[DataStorageType.POKE_STORAGE],
});

export default withRouter(connect(mapStateToProps)(InfoDetailPoke));


InfoDetailPoke.propTypes = { 
    PokemonID: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
};

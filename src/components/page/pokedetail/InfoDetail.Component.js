import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Util, Log, DataStorageType } from '../../../utility';
import PokeTypeList from '../../pokemon-detail/poke-types/PokeTypeList.Component';
import ListPokeDataItemSkeleton from '../../page/pokedata/list-data/ListData.Item.Skeleton';
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
  
  

 function InfoDetailPoke(props) {

    const classes = useStyles();
    const { PokemonID } = props;

    const storagePokeData = PokeStorage.getPokemonDataByID(props, PokemonID);
    const pokeItemHeldData = PokeStorage.getPokemonHeldItemByID(props, PokemonID);


    const dataClickHandler = (pokeID) => {
      Log.debugStr(`Clicked PokeID = ${pokeID}`);
      props.history.push(`/detail/${storagePokeData.id}`);
    }

    if (Util.isNullOrUndefined(storagePokeData)) {
        // Must show error
        return (<ListPokeDataItemSkeleton/>);
    } else {
        return(
            <Card className={classes.root}>
                <CardContent>
                    <Grid container spacing={2} >
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                Height
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {storagePokeData.height}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                Weight
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {storagePokeData.weight}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                Gender
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                Items Held
                            </Typography>
                            {
                                !Util.isNullOrUndefined(pokeItemHeldData) && pokeItemHeldData.map((itm,idx)=>(
                                    <div key={`item-held-comp-${idx}`}>
                                        <Typography variant="body2" gutterBottom>
                                            {`Name: ${itm.name}`}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            {`Rarirty: ${itm.rarity}`}
                                        </Typography>
                                    </div>
                                ))
                            }
                            {
                                !Util.isNullOrUndefined(pokeItemHeldData) && pokeItemHeldData.length <= 0 && <span>-</span>
                            }
                        </Grid>
                    </Grid>
                    {/* <Typography gutterBottom variant="subtitle1" component="span">
                        { "#"+(`${storagePokeData.id}`).padStart(3, '0') }
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h3" style={{ textTransform: 'capitalize' }}>
                        { storagePokeData.name }
                    </Typography> */}
                </CardContent>
                <CardActions>
                    {/* <Link className={classes.btnLeft} color="primary">
                        <SearchIcon/>Detail
                    </Link> */}
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

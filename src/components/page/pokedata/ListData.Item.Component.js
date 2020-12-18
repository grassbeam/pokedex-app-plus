import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Util, Log, DataStorageType } from '../../../utility';
import * as PokeStorage from '../../../data/pokemon/Pokemon.DataStorage';


const useStyles = makeStyles((theme) => (
    {
        root: {
        //   maxWidth: 345,
        },
        btnLeft: {
            marginLeft: 'auto',
            padding: theme.spacing(2),
        },
    }
));
  
  

 function ListPokeDataItem(props) {

    const classes = useStyles();
    const { PokeData } = props;

    const storagePokeData = PokeStorage.getPokemonDataByID(props, PokeData.pokeID);

    if (Util.isNullOrUndefined(storagePokeData)) {
        // Must show error
        return (<Paper className={classes.paper}>Loading...</Paper>);
    } else {
        return(
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={ PokeData.name }
                  height="150"
                  image={storagePokeData.image}
                  title={ PokeData.name }
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    { PokeData.name }
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                    <Link className={classes.btnLeft} color="primary">
                        Detail
                    </Link>
                </CardActions>
              </CardActionArea>
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
    [DataStorageType.POKE_STORAGE] : state[DataStorageType.POKE_STORAGE],
});

export default connect(mapStateToProps)(ListPokeDataItem);
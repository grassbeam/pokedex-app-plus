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
import SearchIcon from '@material-ui/icons/Search';
import { Util, Log, DataStorageType } from '../../../utility';
import PokeTypeList from '../../pokemon-detail/poke-types/PokeTypeList.Component';
import ListPokeDataItemSkeleton from './ListData.Item.Skeleton';

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
  
  

 function ListPokeDataItem(props) {

    const classes = useStyles();
    const { PokeData } = props;

    const storagePokeData = PokeStorage.getPokemonDataByID(props, PokeData.pokeID);

    Log.debugGroup("Check ListData Item Pokemon", storagePokeData);

    if (Util.isNullOrUndefined(storagePokeData)) {
        // Must show error
        return (<ListPokeDataItemSkeleton/>);
    } else {
        return(
            <Card className={classes.root}>
              <CardActionArea style={{ height:'100%', }}>
                <CardMedia
                  component="img"
                  alt={ PokeData.name }
                  height="145"
                  image={storagePokeData.image}
                  title={ PokeData.name }
                />
                <CardContent>
                  <Typography gutterBottom variant="subtitle1" component="span">
                    { "#"+(`${storagePokeData.id}`).padStart(3, '0') }
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h3">
                    { PokeData.name }
                  </Typography>
                  <PokeTypeList
                    ListPokeType={storagePokeData.types}
                  />
                </CardContent>
                <CardActions>
                    {/* <Link className={classes.btnLeft} color="primary">
                        <SearchIcon/>Detail
                    </Link> */}
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
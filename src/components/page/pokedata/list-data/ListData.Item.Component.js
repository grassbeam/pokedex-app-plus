import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
// import SearchIcon from '@material-ui/icons/Search';
import { Util, Log, DataStorageType } from '../../../../utility';
import PokeTypeList from '../../../pokemon-detail/poke-types/PokeTypeList.Component';
import ListPokeDataItemSkeleton from './ListData.Item.Skeleton';
import { withRouter } from "react-router-dom";

import * as PokeStorage from '../../../../data/pokemon/Pokemon.DataStorage';


const useStyles = makeStyles((theme) => (
    {
        root: {
        //   maxWidth: 345,
            height: '100%',
        },
        mediaCard :{
          objectFit: 'contain',
        },
        btnLeft: {
            marginLeft: 'auto',
            padding: theme.spacing(2),
        },
    }
));
  
  

 function ListPokeDataItem(props) {

    const classes = useStyles();
    const { PokemonID, disableClick } = props;

    const storagePokeData = PokeStorage.getPokemonDataByID(props, PokemonID);

    const dataClickHandler = (pokeID) => {
      Log.debugStr(`Clicked PokeID = ${pokeID}`);
      props.history.push(`/detail/${storagePokeData.id}`);
    }

    if (Util.isNullOrUndefined(storagePokeData)) {
        return (<ListPokeDataItemSkeleton/>);
    } else {
        return(
            <Card className={classes.root}>
              <CardActionArea style={{ height:'100%', }} disabled={disableClick} onClick={()=>dataClickHandler(storagePokeData.id)}>
                {/* <Link to={`/detail/${storagePokeData.id}`}> */}
                {/* <Link color="inherit" onClick={dataClickHandler}> */}
                  <CardMedia
                    className={classes.mediaCard}
                    component="img"
                    alt={ storagePokeData.name }
                    height="145"
                    image={storagePokeData.image}
                    title={ storagePokeData.name }
                  />
                  <CardContent>
                    <Typography gutterBottom variant="subtitle1" component="span">
                      { "#"+(`${storagePokeData.id}`).padStart(3, '0') }
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h3" style={{ textTransform: 'capitalize' }}>
                      { storagePokeData.name }
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
                {/* </Link> */}
              </CardActionArea>
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
    [DataStorageType.POKE_STORAGE] : state[DataStorageType.POKE_STORAGE],
});

export default withRouter(connect(mapStateToProps)(ListPokeDataItem));

ListPokeDataItem.propTypes = {
  PokemonID: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  disableClick: PropTypes.bool
};

ListPokeDataItem.defaultProps = {
  disableClick: false,
};
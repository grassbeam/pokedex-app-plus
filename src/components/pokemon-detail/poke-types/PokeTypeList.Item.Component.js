import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Util, Log } from '../../../utility'

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    color: '#FFF',
    '& .poke-type-color' :{
        ...theme.typography.button,
        padding: theme.spacing(0),
        marginTop: theme.spacing(1),
        textTransform: 'capitalize',
        borderRadius: '15px',
        textAlign: 'center',
        '&.name-type-normal': {
            backgroundColor: '#A8A878',
        },
        '&.name-type-fighting': {
            backgroundColor: '#C03028',
        },
        '&.name-type-flying': {
            backgroundColor: '#A890F0',
        },
        '&.name-type-poison': {
            backgroundColor: '#A040A0',
        },
        '&.name-type-ground': {
            backgroundColor: '#E0C068',
        },
        '&.name-type-rock': {
            backgroundColor: '#B8A038',
        },
        '&.name-type-bug': {
            backgroundColor: '#A8B820',
        },
        '&.name-type-ghost': {
            backgroundColor: '#705898',
        },
        '&.name-type-steel': {
            backgroundColor: '#B8B8D0',
        },
        '&.name-type-fire': {
            backgroundColor: '#F08030',
        },
        '&.name-type-water': {
            backgroundColor: '#6890F0',
        },
        '&.name-type-grass': {
            backgroundColor: '#78C850',
        },
        '&.name-type-electric': {
            backgroundColor: '#F8D030',
        },
        '&.name-type-psychic': {
            backgroundColor: '#F85888',
        },
        '&.name-type-ice': {
            backgroundColor: '#98D8D8',
        },
        '&.name-type-dragon': {
            backgroundColor: '#7038F8',
        },
        '&.name-type-dark': {
            backgroundColor: '#705848',
        },
        '&.name-type-fairy': {
            backgroundColor: '#EE99AC',
        },
        '&.name-type-unknown': {
            backgroundColor: '#68A090',
        },
        '&.name-type-shadow': {
            backgroundColor: theme.palette.background.paper,
        },
    },
  },
}));


export default function PokeTypeListItem(props) {

    const classes = useStyles();

    const { PokeType } = props;

    Log.debugGroup("Check Pokemon Types", PokeType);
    return (
        <div className={classes.root}>
            <div className={"poke-type-color name-type-"+PokeType.name}>
                {PokeType.name}
            </div>
        </div>
    );

}


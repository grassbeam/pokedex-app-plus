import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import { Util, Log, DataStorageType } from '../../../utility';
import PokeTypeList from '../../pokemon-detail/poke-types/PokeTypeList.Component';

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
  
  

 export default function ListPokeDataItemSkeleton(props) {

    const classes = useStyles();



    return(
        <Card className={classes.root}>
            <Skeleton variant="rect" height={150} />
            <CardContent>
                <Skeleton variant="text" />
                <Skeleton variant="text" height={24} />
                <Skeleton variant="text" height={24} />
            </CardContent>
        </Card>
    );
};
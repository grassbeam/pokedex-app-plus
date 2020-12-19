import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';


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
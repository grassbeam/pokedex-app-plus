import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';


const useStyles = makeStyles((theme) => (
    {
        root: {
        //   maxWidth: 345,
            height: '100%',
        },
    }
));



export default function InfoDetailSkeleton(props) {


    const classes = useStyles();

    return(
        <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={2} >
                    <Grid item xs={6}>
                        <Skeleton variant="text" height={24} />
                        <Skeleton variant="text" height={24} />
                    </Grid>
                    <Grid item xs={6}>
                        <Skeleton variant="text" height={24} />
                        <Skeleton variant="text" height={24} />
                    </Grid>
                    <Grid item xs={6}>
                        <Skeleton variant="text" height={24} />
                        <Skeleton variant="text" height={24} />
                    </Grid>
                    <Grid item xs={6}>
                        <Skeleton variant="text" height={24} />
                        <Skeleton variant="text" height={24} />
                    </Grid>
                    <Grid item xs={6}>
                        <Skeleton variant="text" height={24} />
                        <Skeleton variant="text" height={24} />
                    </Grid>
                    <Grid item xs={6}>
                        <Skeleton variant="text" height={24} />
                        <Skeleton variant="text" height={24} />
                    </Grid>
                    <Grid item xs={6}>
                        <Skeleton variant="text" height={24} />
                        <Skeleton variant="text" height={24} />
                    </Grid>
                    <Grid item xs={6}>
                        <Skeleton variant="text" height={24} />
                        <Skeleton variant="text" height={24} />
                    </Grid>
                    <Grid item xs={12}>
                        <Skeleton variant="text" height={24} />
                        <Skeleton variant="text" height={24} />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                
            </CardActions>
        </Card>
    );
}



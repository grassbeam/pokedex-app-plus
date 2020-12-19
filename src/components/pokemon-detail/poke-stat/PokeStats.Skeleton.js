import React from 'react';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';



export default function PokeStatsSkeleton(props) {


    const skeletonItem = [];

    for (let i=0; i < 6 ;i++) {
        skeletonItem.push(
            <Grid item sm={2} xs={4}   key={`poke-stats-data-${i}`}> 
                <Skeleton variant="rect" height={170} />
                <Skeleton variant="text" height={24} />
            </Grid>
        );
    }

    return(
        <>
            <Grid container spacing={2} >
                {
                    skeletonItem
                }
            </Grid>
        </>
    );
}





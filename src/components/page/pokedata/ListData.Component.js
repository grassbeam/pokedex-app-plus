import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListPokeDataItem from './ListData.Item.Component';
import ListPokeDataItemSkeleton from './ListData.Item.Skeleton';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));



const CreateItemGrid=(props)=>{
    return (
        <Grid item md={3} sm={5} xs={12}>
            {props.children}
        </Grid>
    );
}

export default function ListPokeData (props) {

    const classes = useStyles();
    const { ListData, PageSize, LoadingNextPage } = props;


    var additionalLoading = [];

    if (LoadingNextPage) {
        for (var i=0; i < PageSize; i++) {
            additionalLoading.push(
                <CreateItemGrid key={"PokeDataLoading-"+i}>
                    <ListPokeDataItemSkeleton />
                </CreateItemGrid>
            );
        }
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={2} justify={'center'}>
                {
                    ListData.map((item, idx)=>{
                        return(
                            <CreateItemGrid key={"PokeData-"+idx}>
                                {
                                    item.isLoading?
                                        <ListPokeDataItemSkeleton />
                                    :
                                        <ListPokeDataItem
                                            PokemonID={item.pokeID}
                                            disableClick={false}
                                        />
                                }
                                
                            </CreateItemGrid>
                        );
                    })
                }
                {
                    LoadingNextPage && additionalLoading
                }
            </Grid>
        </div>
    );
}



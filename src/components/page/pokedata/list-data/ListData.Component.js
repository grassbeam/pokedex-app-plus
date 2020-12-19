import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ListPokeDataItem from './ListData.Item.Component';
import ListPokeDataItemSkeleton from './ListData.Item.Skeleton';
import { Util, Log, DataStorageType } from '../../../../utility';


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
                    !LoadingNextPage && ListData.length <=0 &&

                    <Grid item xs={12}>
                        <Typography variant="h5" style={{ textAlign: 'center'}}>No Data Found</Typography>
                    </Grid>
                }
                {
                    !LoadingNextPage &&
                        ListData.map((item, idx)=>{
                            return(
                                <CreateItemGrid key={"PokeData-"+idx}>
                                    {
                                        // item.isLoading? // change to checking error, if error retry load again
                                        //     <ListPokeDataItemSkeleton />
                                        // :
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

ListPokeData.propTypes = {
    ListData: PropTypes.arrayOf(PropTypes.object).isRequired, 
    PageSize: PropTypes.number.isRequired, 
    LoadingNextPage: PropTypes.bool.isRequired,
};


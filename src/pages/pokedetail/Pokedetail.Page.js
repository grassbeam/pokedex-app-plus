import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import ListPokeDataItem from '../../components/page/pokedata/list-data/ListData.Item.Component';
import InfoDetailPoke from '../../components/page/pokedetail/InfoDetail.Component';
import PokeStatsDetail from '../../components/pokemon-detail/poke-stat/PokeStats.Component';

import { Util, Log } from '../../utility';

import * as PokeDS from '../../data/pokemon/Pokemon.DataSource';
import * as PokeStorage from '../../data/pokemon/Pokemon.DataStorage';

const styles = (theme) => ({
  container: {
      marginTop: theme.spacing(3),
  },
  btnLoadMore :{
      width: '100%',
      marginTop: theme.spacing(2),
  },
  itemContainer: {
      height: '100%',
  },
});


class PokeDetailPage extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            PokeID: props.match.params.id,
            PokeData: PokeStorage.getPokemonDataByID(props, props.match.params.id),
            PokeSpecies: PokeStorage.getPokemonSpeciesByID(props, props.match.params.id),
            isDataNotFound: false,
        };
    }

    componentDidMount() {
        if (Util.isNullOrUndefined(this.state.PokeData)) {
            this.getDetailPokemon();
        }
        if (Util.isNullOrUndefined(this.state.PokeSpecies)) {
            this.getSpeciesPokemon();
        }
        
    }

    getDetailPokemon() {
        PokeDS.getDetailPokemonByID(this.state.PokeID)
            .then(res=>{
                Log.debugGroup("Check response 404", res);
                return res.data
            })
            .then(response=> {
                const pokemonData = PokeStorage.generatePokeDataFromRemote(response);
                this.props.dispatch(PokeStorage.setPokemonData(pokemonData, this.state.PokeID));
            })
            .catch(error=>{
                const statusCode = Log.errorHandlerAPI(error, this.props.ShowErrorMessage);
                if (statusCode == 404) {
                    this.setState({
                        isDataNotFound: true,
                    });
                }
                // let isException = true;
                // if (error.response) {
                //   // The request was made and the server responded with a status code
                //   // that falls out of the range of 2xx
                //   if (error.response.status == 404) {
                //       isException = false;
                //       this.setState({
                //           isDataNotFound: true,
                //       })
                //   } else {
                //       Log.error(`${error.response.data} HTTP Code = ${error.response.status}`);
                //   }
                // } else if (error.request) {
                //   // The request was made but no response was received
                //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                //   // http.ClientRequest in node.js
                //   Log.error(error.request);
                // } else {
                //   // Something happened in setting up the request that triggered an Error
                //   Log.error('Error', error.message);
                // }

                // if (isException) {
                //     // Show Modal Error to refresh page
                //     this.props.ShowErrorMessage("Error Connection", "an error happened while trying to connect to remote server, please try again later");
                // }
            });

    }

    getSpeciesPokemon() {
        PokeDS.getSpeciesPokemonByID(this.state.PokeID)
            .then(res => res.data)
            .then(response => {
                const tempSavingData = PokeStorage.generatePokeSpeciesFromRemote(response);
                this.props.dispatch(PokeStorage.setPokemonSpecies(tempSavingData, this.state.PokeID));
            })
            .catch(error => {

                const statusCode = Log.errorHandlerAPI(error, this.props.ShowErrorMessage);
                if (statusCode == 404) {
                    this.setState({
                        isDataNotFound: true,
                    });
                }
                // let isException = true;
                // if (error.response) {
                //   // The request was made and the server responded with a status code
                //   // that falls out of the range of 2xx
                //   if (error.response.status == 404) {
                //       isException = false;
                //       this.setState({
                //           isDataNotFound: true,
                //       })
                //   } else {
                //       Log.error(`${error.response.data} HTTP Code = ${error.response.status}`);
                //   }
                // } else if (error.request) {
                //   // The request was made but no response was received
                //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                //   // http.ClientRequest in node.js
                //   Log.error(error.request);
                // } else {
                //   // Something happened in setting up the request that triggered an Error
                //   Log.error('Error', error.message);
                // }

                // if (isException) {
                //     // Show Modal Error to refresh page
                //     this.props.ShowErrorMessage("Error Connection", "an error happened while trying to connect to remote server, please try again later");
                // }
            });
    }


    render() {

        if (!Number.isInteger(parseInt(this.state.PokeID)) || this.state.isDataNotFound) {
            this.props.history.push("/error-404");
        }


        return(
            <React.Fragment>
                <Container className={this.props.classes.container} maxWidth="md">
                    <Box>
                        <Grid container spacing={2} justify={'center'}>

                            <Grid item md={5} sm={6} xs={12}>
                                <Box className={this.props.classes.itemContainer}>
                                        <ListPokeDataItem
                                            PokemonID={this.state.PokeID}
                                            disableClick={true}
                                        />
                                </Box>
                            </Grid>


                            <Grid item md={7} sm={6} xs={12}>
                                <Box className={this.props.classes.itemContainer}>
                                    <InfoDetailPoke 
                                        PokemonID={this.state.PokeID}
                                    />
                                </Box>
                            </Grid>


                            <Grid item xs={12}>
                                <Box className={this.props.classes.itemContainer}>
                                    <PokeStatsDetail 
                                        PokemonID={this.state.PokeID}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    
                </Container>
            </React.Fragment>
        );
    }
}


export default withStyles(styles, { withTheme: true })(PokeDetailPage);
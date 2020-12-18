import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import { Util, Log } from '../../utility';
import ListPokeData from '../../components/page/pokedata/ListData.Component';
import BtnProgress from "../../components/button/btn-progress/BtnProgress.Component";
import * as PokeDS from '../../data/pokemon/Pokemon.DataSource';
import * as PokeStorage from '../../data/pokemon/Pokemon.DataStorage';

const styles = (theme) => ({
  container: {
      marginTop: theme.spacing(3),
  },
  btnLoadMore :{
      width: '100%',
      marginTop: theme.spacing(2),
  }
});



class PokeDataPage extends Component {

    constructor(props) {
        super(props);
        const { classes } = props;
        this.state = {
            pageSize: 20,
            totalData: 0,
            currentRequester: 1,
            nextPageURL: "",
            LoadingNextPage: true,
            listDataPoke: [
                // {name: "Bulbasaur", idx: 0, detailURL:"", isLoading: true, isError: false, data: null, // data ke redux },
            ],
        };
    }

    componentDidMount() {
        this.getDefaultListPokemon();
    }

    getDefaultListPokemon() {
        PokeDS.getListPokemon(this.state.pageSize, this.state.nextPageURL)
            .then(res => {
                return res.data;
            })
            .then(response=>{
                var listDataPoke = response.results.map((itm,idx)=>{
                    const pokeID = PokeStorage.getPokeIdFromDetailURL(itm.url);
                    return ({
                        name: itm.name.toUpperCase(),
                        pokeID: pokeID,
                        idx: this.state.totalData + idx,
                        detailURL: itm.url, 
                        isLoading: true, 
                        isError: false,
                        data: null
                    });
                });
                const templist = this.state.listDataPoke.concat(listDataPoke);
                this.setState({
                    listDataPoke: templist,
                    LoadingNextPage: false,
                    nextPageURL: response.next,
                    totalData: templist.length,
                    currentRequester: 1,
                }, ()=>{
                    listDataPoke.map(dataItm => {
                        this.getDetailPokemon(dataItm.detailURL, dataItm.idx, dataItm.pokeID, 1);
                    });
                });
            }).catch(ex => {

            });
    }

    // requester = source detail request
    getDetailPokemon(detailURL, idx, pokeID, requester) {
        const tempPokeData = PokeStorage.getPokemonDataByID(this.props, pokeID);

        const updateloadingStat = () =>{ 
            const tmpListDataPoke = this.state.listDataPoke;
            tmpListDataPoke[idx].isLoading = false;
            if (this.state.currentRequester == requester) {
                this.setState({
                    listDataPoke: tmpListDataPoke,
                });
            }
        };

        if (!Util.isNullOrUndefined(tempPokeData)) {
            updateloadingStat();
        } else {

            PokeDS.getDetailPokemonByURL(detailURL)
                .then(res => {
                    return res.data;
                })
                .then(response=>{
    
                    const pokemonData = {
                        id: response.id,
                        image: response.sprites.front_default,
                        abilities: response.abilities,
                        base_experience: response.base_experience,
                        height: response.height,
                        weight: response.weight,
                        types: response.types.map((itm)=>({ slot: itm.slot, name: itm.type.name , url: itm.type.url})),
                        stats: response.stats,
                    };
                    this.props.dispatch(PokeStorage.setPokemonData(pokemonData, pokeID));
                    updateloadingStat();
                }).catch(ex=>{
                    Log.debugStr(ex);
                });
        }
    }

    handleLoadMorePage() {
        if(this.state.currentRequester == 1) {
            // 1 = Default List Pokemon (from API '/pokemon')
            this.setState({
                LoadingNextPage: true,
            }, ()=>{
                this.getDefaultListPokemon();
            });
        } else {
            // For filtering

        }
    }



    render() {
        return(
            <React.Fragment>
                <Container className={this.props.classes.container} maxWidth="md">
                    <Box>
                        <ListPokeData 
                            ListData={this.state.listDataPoke} 
                            PageSize={this.state.pageSize}
                            LoadingNextPage={this.state.LoadingNextPage} 
                        />
                    </Box>

                    <BtnProgress
                        onClick={this.handleLoadMorePage.bind(this)}
                        isLoading={this.state.LoadingNextPage}
                        btnClassName={this.props.classes.btnLoadMore}
                        text="Load More..."
                    />
                    
                </Container>
            </React.Fragment>
        );
    }
}

export default withStyles(styles, { withTheme: true })(PokeDataPage);
import React, { PureComponent } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import { Util, Log } from '../../utility';
import ListPokeData from '../../components/page/pokedata/list-data/ListData.Component';
import BtnProgress from '../../components/button/btn-progress/BtnProgress.Component';
import FilterDataPokeComponent from '../../components/page/pokedata/filter-data/FilterData.Component';

import * as PokeDS from '../../data/pokemon/Pokemon.DataSource';
import * as PokeStorage from '../../data/pokemon/Pokemon.DataStorage';
import * as PokeTypeStorage from '../../data/types/Types.DataStorage';
import * as PokeTypeDS from '../../data/types/Types.DataSource';

const styles = (theme) => ({
  container: {
      marginTop: theme.spacing(3),
  },
  boxFilter: {
      marginBottom: theme.spacing(2),
  },
  btnLoadMore :{
      width: '100%',
  },
  containerLoadMore : {
    marginTop: theme.spacing(2),
  }
});

const PokemonDataItemPage = (name, pokeID, idx, detailURL, isLoading=true, isError=false, data=null) => ({
    name,
    pokeID,
    idx,
    detailURL,
    isLoading,
    isError,
    data,
});


class PokeDataPage extends PureComponent {

    constructor(props) {
        super(props);
        const { classes } = props;
        this.state = {
            pageSize: 20,
            totalData: 0,
            maxTotalData: null, // for filtering
            currentRequester: 1,
            nextPageURL: "",
            LoadingNextPage: true,
            listDataPoke: [
                // model on PokemonDataItemPage,
            ],
            filterTypeID: "",
        };
    }

    componentDidMount() {
        Log.debugStr("Component PokeData Page didMount");
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
                    return PokemonDataItemPage(itm.name.toUpperCase(), pokeID, (this.state.totalData+idx)
                                , itm.url, true, false, null);
                    // return ({
                    //     name: itm.name.toUpperCase(),
                    //     pokeID: pokeID,
                    //     idx: this.state.totalData + idx,
                    //     detailURL: itm.url, 
                    //     isLoading: true, 
                    //     isError: false,
                    //     data: null
                    // });
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

        if (Util.isNullOrUndefined(tempPokeData)) {
            PokeDS.getDetailPokemonByURL(detailURL)
                .then(res => {
                    return res.data;
                })
                .then(response=>{
                    const pokemonData = PokeStorage.generatePokeDataFromRemote(response);
                    this.props.dispatch(PokeStorage.setPokemonData(pokemonData, pokeID));
                    // updateloadingStat();
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
            // For filtered data
            this.handleNextPageFiltered();
        }
    }

    handleClearFilter() {
        if (this.state.currentRequester == 1) {
            // applying / clearing filter when data default loaded = Is not very effective...
            return;
        }  else {

            this.setState({
                totalData: 0,
                maxTotalData: null,
                currentRequester: 1,
                nextPageURL: "",
                LoadingNextPage: true,
                listDataPoke: [],
                filterTypeID: "",
            }, ()=> this.getDefaultListPokemon());
            
        }
    }
    
    handleSubmitFilter(TypeID) {

        this.setState({
            totalData: 0,
            currentRequester: 2,
            nextPageURL: "",
            LoadingNextPage: true,
            listDataPoke: [],
            filterTypeID: TypeID,
        }, ()=> this.loadFilterData(TypeID, this.state.pageSize, 0));

    }

    loadFilterData(TypeID, limit, offset) {
        const tmpPokemonArr = PokeTypeStorage.getTypeDataPokemonByID(this.props, TypeID, limit, offset);
        if(!Util.isNullOrUndefined(tmpPokemonArr)) {
            // Load data from redux
            const countTotalData = this.state.maxTotalData == null? PokeTypeStorage.countTypeDataPokemonByID(this.props, TypeID) : this.state.maxTotalData;
            this.loadPageDataFiltered(tmpPokemonArr, countTotalData);
        } else {
            PokeTypeDS.getPokemonTypeByID(TypeID)
                .then(res => res.data)
                .then(response => {
                    const tempDataSaving = PokeTypeStorage.generateTypeDetailDataFromResponse(response);

                    // handle slow update data
                    if (this.state.filterTypeID == TypeID) {
                        this.props.dispatch(PokeTypeStorage.setPokemonTypeDetailData(tempDataSaving, TypeID));
                        this.loadPageDataFiltered(PokeTypeStorage.generateTypeDataPokemon(tempDataSaving.pokemon, limit, offset), tempDataSaving.pokemon.length);
                    }
                })
                .catch(error=>{
                    Log.error(error);
                });

        }
    }

    loadPageDataFiltered(data, maxTotal=999) {
        if (!Util.isNullOrUndefined(data)) {
            
            const tempListDataPoke = data.map((itm, idx) => {
                const pokeID = PokeStorage.getPokeIdFromDetailURL(itm.url);
                return PokemonDataItemPage(itm.name.toUpperCase(), pokeID, (this.state.totalData+idx)
                            , itm.url, true, false, null);
            });

            
            const templist = this.state.listDataPoke.concat(tempListDataPoke);

            this.setState({
                listDataPoke: templist,
                LoadingNextPage: false,
                nextPageURL: templist.length >= maxTotal? null : "filtered",
                totalData: templist.length,
                maxTotalData: maxTotal,
                currentRequester: 2,
            }, ()=>{
                tempListDataPoke.map(dataItm => {
                    this.getDetailPokemon(dataItm.detailURL, dataItm.idx, dataItm.pokeID, 1);
                });
            });
        } else {
            // handle bugs data empty
        }
    }

    handleNextPageFiltered() {
        this.loadFilterData(this.state.filterTypeID, this.state.pageSize, this.state.listDataPoke.length);
    }

    render() {
        return(
            <React.Fragment>
                <Container className={this.props.classes.container} maxWidth="md">
                    <Box className={this.props.classes.boxFilter}>
                        <FilterDataPokeComponent
                            onSubmitFilter={this.handleSubmitFilter.bind(this)}
                            onClearFilter={this.handleClearFilter.bind(this)}
                        />
                    </Box>

                    <Box>
                        <ListPokeData 
                            ListData={this.state.listDataPoke} 
                            PageSize={this.state.pageSize}
                            LoadingNextPage={this.state.LoadingNextPage} 
                        />
                    </Box>

                    <Box className={this.props.classes.containerLoadMore}>
                        {
                            !Util.isNullOrEmpty(this.state.nextPageURL) &&
                                <BtnProgress
                                    onClick={this.handleLoadMorePage.bind(this)}
                                    isLoading={this.state.LoadingNextPage}
                                    btnClassName={this.props.classes.btnLoadMore}
                                    variant="contained"
                                    color="primary"
                                    text="Load More..."
                                />
                        }
                    </Box>
                    
                </Container>
            </React.Fragment>
        );
    }
}

export default withStyles(styles, { withTheme: true })(PokeDataPage);
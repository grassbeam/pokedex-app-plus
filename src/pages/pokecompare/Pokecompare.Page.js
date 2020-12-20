import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { TableTitleSeparator } from '../../components/page/pokecompare/compare-wrapper/CompareWrapper.Component';
import HeaderInputComponent from '../../components/page/pokecompare/header-input/HeaderInput.Component';
import HeaderSubComponent from '../../components/page/pokecompare/header-sub/HeaderSub.Component';
import BasicInfoComponent from '../../components/page/pokecompare/basic-info/BasicInfo.Component';
import BreedTrainInfoComponent from '../../components/page/pokecompare/breed-train-info/BreedTrainInfo.Component';
import StatsInfoCompareComponent from '../../components/page/pokecompare/stats-info/StatsInfoCompare.Component';
import FlavorInfoComponent from '../../components/page/pokecompare/flavor-info/FlavorInfo.Component';
import LevelUpMovesComponent from '../../components/page/pokecompare/moves-info/LevelUpMoves.Component';

import { Util, Log } from '../../utility';

import * as PokeDS from '../../data/pokemon/Pokemon.DataSource';
import * as PokeStorage from '../../data/pokemon/Pokemon.DataStorage';
import * as TypeDS from '../../data/types/Types.DataSource';
import * as TypeStorage from '../../data/types/Types.DataStorage';

const styles = (theme) => ({
    root: {
      marginTop: theme.spacing(3),
    },
    tableRoot: {
      display: 'flex',
      marginTop: theme.spacing(3),
    //   overflowX: 'hide',
    },
    table: {
    //   minWidth: 340,
    },
    tableCell: {
      paddingRight: 4,
      paddingLeft: 5
    },
    tableCellHeaderInput: {
      paddingRight: 4,
      paddingLeft: 5,
      maxHeight: '150px',
    },
    tableCellInfo: {
        paddingRight: 4,
        paddingLeft: 15,
    },
    tableCellSeparator: {
        backgroundColor: '#b4c7e6',
        fontWeight: 'bold',
    }
  });
  

class PokeComparePage extends PureComponent {
    constructor(props) {
        super(props);
        
        const compareSize = 3;
        this.state = {
            compareSize: compareSize,
            comparingPokeID: Array(compareSize).fill(""),
            comparingPokeData: Array(compareSize).fill({ pokeData: null, pokeSpecies: null }),
            isLoadingData: false,
            isDownloadingData: false,
            gameVersionType: "",
        };
    }

    componentDidMount() {
        if (!Util.isNullOrUndefined(TypeStorage.getTypeGameVersion(this.props))) {
            if (TypeStorage.checkDataNeedUpdate(this.props, TypeStorage.STORAGE_TYPES_GAME_VERSION)) {
                this.getGameVersionType();
            }
        } else {
            this.getGameVersionType();
        }
    }


    handleSubmitCompare(arrPokeIdComparing, gameVersionType) {
        this.setState({
            comparingPokeID: arrPokeIdComparing,
            isLoadingData: true,
            gameVersionType,
        }, ()=>{
            this.LoadDataComparing();
        });
    }

    LoadDataComparing() {
        for(let idx=0; idx < this.state.comparingPokeID.length; idx++) {
            const pokeID = this.state.comparingPokeID[idx];
            if (!Util.isNullOrEmpty(pokeID)) {
                const PokeData =  PokeStorage.getPokemonDataByID(this.props, pokeID);
                const PokeSpecies = PokeStorage.getPokemonSpeciesByID(this.props, pokeID);

                var waitingResult = false;
                if (Util.isNullOrUndefined(PokeData)) {
                    waitingResult = true;
                    this.getDetailPokemon(pokeID);
                } else if (Util.isNullOrUndefined(PokeSpecies)) {
                    waitingResult = true;
                    this.getSpeciesPokemon(pokeID);
                }
                if (waitingResult) {
                    this.props.dispatch(PokeStorage.setStatusCompare(99, pokeID));
                }
            }
            
        }
        this.setState({
            isLoadingData: false,
        });
    }

    getDetailPokemon(PokeID) {
        PokeDS.getDetailAndSpeciesPokemonByID(PokeID)
            .then(responses => {
                var pokeData = null;
                var pokeSpecies = null;

                if (!Util.isNullOrUndefined(responses)) {
                    if (!Util.isNullOrUndefined(responses.PokeData)) {
                        pokeData = responses.PokeData.data;
                    }
                    if (!Util.isNullOrUndefined(responses.PokeSpecies)) {
                        pokeSpecies = responses.PokeSpecies.data;
                    }
                }
            

                // Saving PokeData
                if (!Util.isNullOrUndefined(pokeData)) {
                    const tempSavingPokeData = PokeStorage.generatePokeDataFromRemote(pokeData);
                    this.props.dispatch(PokeStorage.setPokemonData(tempSavingPokeData, PokeID));
                }

                // Saving PokeSpecies
                if (!Util.isNullOrUndefined(pokeSpecies)) {

                    const tempSavingPokeSpecies = PokeStorage.generatePokeSpeciesFromRemote(pokeSpecies);
                    this.props.dispatch(PokeStorage.setPokemonSpecies(tempSavingPokeSpecies, PokeID));
                }

            })
            .catch(error=>{
                Log.error(error);
                Log.errorHandlerAPI(error, this.props.ShowErrorMessage);
            });

    }

    getSpeciesPokemon(PokeID) {
        PokeDS.getSpeciesPokemonByID(PokeID)
            .then(res => res.data)
            .then(response => {
                const tempSavingData = PokeStorage.generatePokeSpeciesFromRemote(response);
                this.props.dispatch(PokeStorage.setPokemonSpecies(tempSavingData, PokeID));
            })
            .catch(error => {
                const statusCode = Log.errorHandlerAPI(error, this.props.ShowErrorMessage);
                if (statusCode == 404) {
                }
            });
    }

    getGameVersionType() {
        TypeDS.getGameVersionTypeList()
            .then(res => res.data)
            .then(response => {
                this.props.dispatch(TypeStorage.setGameVersionData(response.results));
            })
            .catch(error => {
                const statusCode = Log.errorHandlerAPI(error, this.props.ShowErrorMessage);
                if (statusCode == 404) {
                }
            });

    }


    render = () => (
        <Container className={this.props.classes.root} maxWidth="lg">
            <Paper >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <HeaderInputComponent
                                tableCellClassName={this.props.classes.tableCell}
                                currentComparingPokeID={this.state.currentComparingPokeID}
                                inputSize={this.state.compareSize}
                                onSubmitCompare={this.handleSubmitCompare.bind(this)}
                                isLoadingData={this.state.isLoadingData}
                            />
                            <HeaderSubComponent
                                tableRowClassName={this.props.classes.tableCellInfo}
                                tableCellClassName={this.props.classes.tableCell}
                                ArrPokeID={this.state.comparingPokeID}
                            />
                        </TableHead>
                        <TableBody>
                            <BasicInfoComponent 
                                tableCellInfoClassName={this.props.classes.tableCellInfo}
                                tableCellClassName={this.props.classes.tableCell}
                                ArrPokeID={this.state.comparingPokeID}
                            />
                            <TableTitleSeparator
                                ColSize={ this.state.compareSize+1 }
                                tableCellClassName={ this.props.classes.tableCellSeparator }
                            >
                                Breeding + Training
                            </TableTitleSeparator>
                            <BreedTrainInfoComponent 
                                tableCellInfoClassName={this.props.classes.tableCellInfo}
                                tableCellClassName={this.props.classes.tableCell}
                                ArrPokeID={this.state.comparingPokeID}
                            />
                            <TableTitleSeparator
                                ColSize={ this.state.compareSize+1 }
                                tableCellClassName={ this.props.classes.tableCellSeparator }
                            >
                                Stats
                            </TableTitleSeparator>
                            <StatsInfoCompareComponent
                                tableCellInfoClassName={this.props.classes.tableCellInfo}
                                tableCellClassName={this.props.classes.tableCell}
                                ArrPokeID={this.state.comparingPokeID}
                            />
                            <TableTitleSeparator
                                ColSize={ this.state.compareSize+1 }
                                tableCellClassName={ this.props.classes.tableCellSeparator }
                            >
                                Flavor
                            </TableTitleSeparator>
                            <FlavorInfoComponent 
                                tableCellInfoClassName={this.props.classes.tableCellInfo}
                                tableCellClassName={this.props.classes.tableCell}
                                ArrPokeID={this.state.comparingPokeID}
                            />
                            <TableTitleSeparator
                                ColSize={ this.state.compareSize+1 }
                                tableCellClassName={ this.props.classes.tableCellSeparator }
                            >
                                { `Level-up Moves ${(!Util.isNullOrEmpty(this.state.gameVersionType)?"(version: " + this.state.gameVersionType+")":"")}` }
                            </TableTitleSeparator>
                            <LevelUpMovesComponent
                                tableCellInfoClassName={this.props.classes.tableCellInfo}
                                tableCellClassName={this.props.classes.tableCell}
                                ArrPokeID={this.state.comparingPokeID}
                                GameVersionType={this.state.gameVersionType}
                            />
                        </TableBody>
                    </Table>
            </Paper>
        </Container>
        
    );
}




export default withStyles(styles, { withTheme: true })(PokeComparePage);

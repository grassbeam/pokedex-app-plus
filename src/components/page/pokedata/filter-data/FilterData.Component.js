import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Util, Log, DataStorageType } from '../../../../utility';
import BtnProgress from '../../../button/btn-progress/BtnProgress.Component';

import * as PokeTypeStorage from '../../../../data/types/Types.DataStorage';
import * as PokeTypeDS from '../../../../data/types/Types.DataSource';


const useStyles = makeStyles((theme) => ({
    root: {
    //   maxWidth: 345,
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: "50%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
      textTransform: 'capitalize',
    },
    menuItemSelect: {
        textTransform: 'capitalize',
    },
  }));
  
  

 function FilterDataPokeComponent(props) {

    const { onSubmitFilter, onClearFilter } = props;
    const classes = useStyles();

    const typePokeData = PokeTypeStorage.getTypeListData(props);

    const [expanded, setExpanded] = React.useState(false);

    const [loadingMasterData, setLoadingMasterData] = React.useState(Util.isNullOrUndefined(typePokeData));

    const [filterID, handleFilter] = React.useState("");
    
    const [isUpdatingDataOnProgress, setUpdatingDataProgress] = React.useState(false);

    useEffect(()=>{

        if (!isUpdatingDataOnProgress) {
            if (Util.isNullOrUndefined(typePokeData)) {
                // Must fetch the data...
                handleFetchPokeType();
            } else {
                // Check if need to load it

            }
        }
    });

    const handleFetchPokeType = () => {
        setUpdatingDataProgress(true);
        PokeTypeDS.getPokemonTypesList()
            .then((res) => res.data)
            .then((response) => {
                let responseObj = { };
                response.results.map((resItem)=>{
                    let typeID = PokeTypeStorage.getTypeIdFromURL(resItem.url);
                    responseObj[typeID] = PokeTypeStorage.generateTypeMasterData(resItem)
                })
                const dispatchObject = PokeTypeStorage.setPokemonTypeData(responseObj);
                props.dispatch(dispatchObject);
                setUpdatingDataProgress(false);
                setLoadingMasterData(false);
            }).catch(error=>{
                setUpdatingDataProgress(true); // keep it to true so not loading often
                Log.error(error);
                if(Util.isNullOrUndefined(typePokeData)) {
                    // Show Error, because the data still empty and the API failed to response
                }
            });
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleChangeSelect = (event) => {
      const name = event.target.name;
      handleFilter(event.target.value);
    };

    const handleApplyFilter = () => {
        Log.debugStr("Applying Filter...")
        if (Util.isNullOrEmpty(filterID)) {
            // handle like clear filter
            onClearFilter();
        } else {
            onSubmitFilter(filterID);
        }
    };

    const handleClearFilter = () => {
        handleFilter("");
        onClearFilter();
    }


    return(
        <Card className={classes.root}>
            {/* <CardActionArea onClick={handleExpandClick}> */}
                <CardActions disableSpacing>
                    <Typography variant="subtitle1" >
                        Filter:
                    </Typography>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                    <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
            {/* </CardActionArea> */}
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink id="label-select-type-pokemon">
                        Pokemon Type
                        </InputLabel>
                        <Select
                            labelId="label-select-type-pokemon"
                            id="select-type-pokemon"
                            value={filterID}
                            onChange={handleChangeSelect}
                            disabled={loadingMasterData}
                            displayEmpty
                            className={classes.selectEmpty}
                        >
                            <MenuItem className={classes.menuItemSelect} value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                !Util.isNullOrUndefined(typePokeData) && typePokeData.map((itm, idx)=>(
                                    <MenuItem className={classes.menuItemSelect} key={`select-item-${idx}`} value={itm.id} >{itm.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    
                    <FormControl >
                        <BtnProgress 
                            onClick={handleClearFilter.bind(this)}
                            isLoading={loadingMasterData}
                            // btnClassName={this.props.classes.btnLoadMore}
                            variant="contained"
                            color="default"
                            text="Clear"
                        />
                    </FormControl>
                    
                    <FormControl >
                        <BtnProgress 
                            onClick={handleApplyFilter.bind(this)}
                            isLoading={loadingMasterData}
                            // btnClassName={this.props.classes.btnLoadMore}
                            variant="contained"
                            color="primary"
                            text="Apply"
                        />
                    </FormControl>
                </CardContent>
            </Collapse>
        </Card>
    );
}

const mapStateToProps = (state) => ({
    [DataStorageType.POKE_TYPE_STORAGE] : state[DataStorageType.POKE_TYPE_STORAGE],
});

export default connect(mapStateToProps)(FilterDataPokeComponent);

FilterDataPokeComponent.propTypes = {
    onSubmitFilter: PropTypes.func.isRequired, 
    onClearFilter: PropTypes.func.isRequired,
};
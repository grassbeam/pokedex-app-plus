import React from 'react';
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
import { Util, DataStorageType } from '../../../../utility';
import BtnProgress from '../../../button/btn-progress/BtnProgress.Component';

import * as PokeTypeStorage from '../../../../data/types/Types.DataStorage';


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

    const [filterID, handleFilter] = React.useState("");

    const loadingMasterData = Util.isNullOrUndefined(typePokeData);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleChangeSelect = (event) => {
      const name = event.target.name;
      handleFilter(event.target.value);
    };

    const handleApplyFilter = () => {
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
                            variant="contained"
                            color="default"
                            text="Clear"
                        />
                    </FormControl>
                    
                    <FormControl >
                        <BtnProgress 
                            onClick={handleApplyFilter.bind(this)}
                            isLoading={loadingMasterData}
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
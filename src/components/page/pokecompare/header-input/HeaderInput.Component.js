import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';

import BtnProgress from '../../../button/btn-progress/BtnProgress.Component';

import { Util, Log, DataStorageType } from '../../../../utility';

import * as PokeTypeStorage from '../../../../data/types/Types.DataStorage';



const useStyles = makeStyles((theme) => (
    {
        formControl: {
          margin: theme.spacing(1),
          width: "100%",
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
          textTransform: 'capitalize',
        },
        menuItemSelect: {
            textTransform: 'capitalize',
        },
    }
));

function HeaderInputComponent(props) {

    const classes = useStyles();
    const { tableRowClassName, tableCellClassName, inputSize, isLoadingData, onSubmitCompare, currentComparingPokeID } = props;

    const [inputState, setInputState] = useState(Array(inputSize).fill(''));

    const [gameVersionType, setGameVersionType] = useState("");

    const [FormError, setFormError] = useState({ Status: false,  SelectGameVersion: "",});

    const typeGameVersionData = PokeTypeStorage.getTypeGameVersion(props);
    const loadingMasterData = Util.isNullOrUndefined(typeGameVersionData);

    const handleClickCompare = () => {
        if (!Util.isNullOrEmpty(gameVersionType)) {
            onSubmitCompare([...inputState], gameVersionType);
        } else {
            // show error
            setFormError({
                ...FormError,
                Status: true,
                SelectGameVersion: "Please Choose!"
            });
        }
    }

    const handleChangeInput = (index, event) => {
        const tempstate = inputState;
        tempstate[index] = event.target.value;
        setInputState([...tempstate]);
    }

    const handleChangeSelect = (event) => {
        setGameVersionType(event.target.value);
        setFormError({
            ...FormError,
            Status: false,
            SelectGameVersion: "",
        });
    };

    return (
        <TableRow className={tableRowClassName}>
            <TableCell
                className={tableCellClassName}
                align="right"
            >
                <Box>
                    <BtnProgress
                        onClick={ handleClickCompare }
                        isLoading={ isLoadingData }
                        variant="contained"
                        color="primary"
                        text="Compare"
                    />
                </Box>

                <FormControl className={classes.formControl} error={!!(FormError.Status)}>
                        <InputLabel shrink id="label-select-type-game-version">
                        Game Version
                        </InputLabel>
                        <Select
                            labelId="label-select-type-game-version"
                            id="select-type-game-version"
                            value={gameVersionType}
                            onChange={handleChangeSelect}
                            disabled={loadingMasterData}
                            displayEmpty
                            className={classes.selectEmpty}
                        >
                            <MenuItem className={classes.menuItemSelect} value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                !Util.isNullOrUndefined(typeGameVersionData) && typeGameVersionData.map((itm, idx)=>(
                                    <MenuItem className={classes.menuItemSelect} key={`select-item-${idx}`} value={itm.name} >{itm.name}</MenuItem>
                                ))
                            }
                        </Select>
                        <FormHelperText>{FormError.SelectGameVersion}</FormHelperText>
                    </FormControl>
            </TableCell>

            {
                inputState.length > 0 && inputState.map((itm, idx)=>(
                    <TableCell
                        className={tableCellClassName}
                        key={`key-cell-input-${idx}`}
                        align="center"
                    >
                        <TextField
                            id={`pokeid-input-${(idx+1)}`} 
                            label={`Pokemon ID ${(idx+1)}`}
                            type="number"
                            value={inputState[idx]}
                            onChange={(event)=>handleChangeInput(idx, event)}
                            style={{ margin: 10, padding: 0 }}
                        />
                    </TableCell>
                ))
            }
        
        </TableRow>
    );
}

const mapStateToProps = (state) => ({
    [DataStorageType.POKE_STORAGE] : state[DataStorageType.POKE_STORAGE],
    [DataStorageType.POKE_TYPE_STORAGE] : state[DataStorageType.POKE_TYPE_STORAGE],
});

export default connect(mapStateToProps)(HeaderInputComponent);

HeaderInputComponent.propTypes = {
    tableCellClassName: PropTypes.string,
    tableRowClassName: PropTypes.string,
    inputSize: PropTypes.number.isRequired,
    isLoadingData: PropTypes.bool.isRequired,
};

HeaderInputComponent.defaultProps = {
    tableCellClassName: '',
    tableRowClassName: '',
};



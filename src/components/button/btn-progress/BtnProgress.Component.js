import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));


export default function BtnProgress(props) {

    const classes = useStyles();

    const { onClick, isLoading, btnClassName, text } = props

    return(
        <div className={classes.wrapper}>
            <Button
                className={btnClassName}
                variant="contained" 
                color="primary"
                disabled={isLoading}
                onClick={onClick}
            >
                {text}
            </Button>
            {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
    );
}
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { grey } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: grey[50],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));


export default function BtnProgress(props) {

    const classes = useStyles();

    const { onClick, isLoading, btnClassName, text, variant, color } = props

    return(
        <div className={classes.wrapper}>
            <Button
                className={btnClassName}
                variant={variant} 
                color={color}
                disabled={isLoading}
                onClick={onClick}
            >
                {text}
            </Button>
            {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
    );
}

BtnProgress.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  btnClassName: PropTypes.object,
  text: PropTypes.string.isRequired,
  variant: PropTypes.string,
  color: PropTypes.string,
};

BtnProgress.defaultProps = {
  variant: "contained",
  color: "primary"
};
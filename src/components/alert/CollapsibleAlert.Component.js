import React from 'react';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';




export default function CollapsibleAlert(props) {

    const { onClose, isShowAlert, AlertSeverity, Title, children } = props;


    return(
        <Collapse in={isShowAlert}>
            <Alert
                severity={AlertSeverity}
                action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={onClose}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
                }
            >
                <AlertTitle>{ Title }</AlertTitle>
                { children }
            </Alert>
        </Collapse>
    );
};

CollapsibleAlert.propTypes = {
    onClose: PropTypes.func.isRequired,
    isShowAlert: PropTypes.bool.isRequired,
    AlertSeverity: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
    Title: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),
};

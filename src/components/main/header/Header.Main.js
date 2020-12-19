import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
  },
}));

function MainHeader (props) {
    const classes = useStyles();
    const { PageTitle } = props;

    const onClickAppBarTitle = () =>{
      props.history.push("/");
    };

    return (
        <AppBar position="static">
            <Toolbar>
                  <Typography variant="h6" className={classes.title} onClick={ onClickAppBarTitle } >
                    { PageTitle }
                  </Typography>
                    
                    
                <Button color="inherit" onClick={()=>props.history.push("/login")} >Compare Pokemon</Button>
                
            </Toolbar>
        </AppBar>
    );
}

export default withRouter(MainHeader)

MainHeader.propTypes = {
  PageTitle: PropTypes.string.isRequired,
};
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Util } from '../../../utility';



const useStyles = makeStyles((theme) => (
    {
        textContent: {
            textTransform: 'capitalize',
        },
    }
));
  

export default function PokeItemHeldData(props) {
    const classes = useStyles();

    const { PokeItemHeldData } = props;


    return(
        <>
            {
                !Util.isNullOrUndefined(PokeItemHeldData) && PokeItemHeldData.map((itm,idx)=>(
                    <div key={`item-held-comp-${idx}`}>
                        <Typography className={classes.textContent} variant="body2" gutterBottom>
                            {`Name: ${itm.name}`}
                        </Typography>
                        <Typography className={classes.textContent} variant="body2" gutterBottom>
                            {`Rarirty Rate: ${itm.rarity}`}
                        </Typography>
                    </div>
                ))
            }
            {
                !Util.isNullOrUndefined(PokeItemHeldData) && PokeItemHeldData.length <= 0 && <span>-</span>
            }
        </>
    );
}

PokeItemHeldData.propTypes = {
    PokeItemHeldData: PropTypes.arrayOf(PropTypes.object),
};

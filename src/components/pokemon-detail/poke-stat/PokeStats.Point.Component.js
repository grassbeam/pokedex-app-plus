import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


export default function PokeStatsPoint(props) {

    const { Point, Title } = props;

    const tempIntPoint = parseInt(Point);

    const powerHeight = Math.ceil(tempIntPoint/15);

    const powerLeft = 15-powerHeight;


    const powerHeightComp = []
    for (let i = 0; i< powerHeight; i++) {
        powerHeightComp.push(
            <div style={{ border: '1px solid blue', backgroundColor: 'blue', padding: '5px', marginTop: '3px'}}  key={`power-height-comp-${i}`}>

            </div>
        );
    }
    const powerLeftComp = []
    for (let i = 0; i< powerLeft; i++) {
        powerLeftComp.push(
            <div style={{ border: '1px solid #000000', backgroundColor: '#F0F0F0', padding: '5px', marginTop: '3px'}} key={`power-left-comp-${i}`}>

            </div>
        );
    }

    return(
        <Box>
            { powerLeftComp }
            { powerHeightComp }

            
            <Typography variant="body2" gutterBottom style={{ textTransform: 'uppercase', textAlign: 'center' }}>
                { Title }
            </Typography>
        </Box>
    );
};


PokeStatsPoint.propTypes = {
    Point: PropTypes.number.isRequired, 
    Title: PropTypes.string.isRequired,
};



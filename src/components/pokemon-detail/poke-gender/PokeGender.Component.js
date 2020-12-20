import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';
import Divider from '@material-ui/core/Divider';



export default function PokeGender(props) {

    const { PokeGenderRate } = props;

    const genderRateFemale = (PokeGenderRate>=0) && `${PokeGenderRate}/8`;
    const genderRateMale = (PokeGenderRate>=0) && `${(8-PokeGenderRate)}/8`; 

    return (
        <>
        {
            PokeGenderRate < 0?
            "-":
            <>
                { genderRateMale }
                <SvgIcon>
                    <path fill="currentColor" d="M9,9C10.29,9 11.5,9.41 12.47,10.11L17.58,5H13V3H21V11H19V6.41L13.89,11.5C14.59,12.5 15,13.7 15,15A6,6 0 0,1 9,21A6,6 0 0,1 3,15A6,6 0 0,1 9,9M9,11A4,4 0 0,0 5,15A4,4 0 0,0 9,19A4,4 0 0,0 13,15A4,4 0 0,0 9,11Z" />
                </SvgIcon>
                <span style={{ border: '1px solid #000', height: '100%', marginRight: '5px', marginLeft: '2px'}}></span>
                { genderRateFemale }
                <SvgIcon>
                    <path fill="currentColor" d="M12,4A6,6 0 0,1 18,10C18,12.97 15.84,15.44 13,15.92V18H15V20H13V22H11V20H9V18H11V15.92C8.16,15.44 6,12.97 6,10A6,6 0 0,1 12,4M12,6A4,4 0 0,0 8,10A4,4 0 0,0 12,14A4,4 0 0,0 16,10A4,4 0 0,0 12,6Z" />
                </SvgIcon>
            </>
        }
        </>
    );
}

PokeGender.propTypes = {
    PokeGenderRate: PropTypes.number.isRequired,
    
};


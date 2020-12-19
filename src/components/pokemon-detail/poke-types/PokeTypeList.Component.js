import React from 'react';
import PropTypes from 'prop-types';
import PokeTypeListItem from './PokeTypeList.Item.Component';



export default function PokeTypeList(props) {

    const { ListPokeType } = props;

    return(
        <>
            {
                ListPokeType.map((item,idx)=>(
                    <PokeTypeListItem
                        key={"poketypes-"+idx}
                        PokeType={item}
                    />
                ))
            }
        </>
    );
}

PokeTypeList.propTypes = {
    ListPokeType: PropTypes.arrayOf(PropTypes.object).isRequired
};
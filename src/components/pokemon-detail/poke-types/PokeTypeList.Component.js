import React from 'react';
import { Util, Log } from '../../../utility'
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


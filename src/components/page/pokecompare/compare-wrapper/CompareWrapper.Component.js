import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import { Util, Log } from '../../../../utility';


export const TableTitleSeparator = ({ColSize, tableCellClassName, tableRowClassName, CellAlignment, CellSize, children}) => (
    <TableRow className={tableRowClassName} role="checkbox" tabIndex={-1} >
        <TableCell colSpan={ColSize} size={CellSize} className={tableCellClassName} align={CellAlignment}>
            { children }
        </TableCell>
    </TableRow>
);
TableTitleSeparator.propTypes = {
    ColSize: PropTypes.number.isRequired,
    tableCellClassName: PropTypes.string,
    tableRowClassName: PropTypes.string,
    CellAlignment: PropTypes.string,
    CellSize: PropTypes.string,
};
TableTitleSeparator.defaultProps = {
    tableCellClassName: "",
    tableRowClassName: "",
    CellAlignment: "center",
    CellSize: "small",
};

export const TableCellDataWrapper = ({ className, children }) => (
    <TableCell className={className} align="center">
        { children }
    </TableCell>
);

export const CompareDataWrapper =({ Item, tableCellClassName, children }) => {

    if (Util.isNullOrEmpty(Item.PokeID)) {
        return (
            <TableCellDataWrapper  className={tableCellClassName} >
                {""}
            </TableCellDataWrapper>
        );
    } else if (Util.isNullOrUndefined(Item.PokeData)) {
        // make it detect not found so not loading at all
        return( 
            <TableCellDataWrapper className={tableCellClassName} >
                <Skeleton variant="text" height={24} /> 
            </TableCellDataWrapper>
        );
    } else {
        return (
            <TableCellDataWrapper  className={tableCellClassName} >
                { children }
            </TableCellDataWrapper>
        );
    }
}


export const AbilitiesWrapper = ({ AbilitiesData }) => {
    if (Util.isNullOrUndefined(AbilitiesData)) {
        return ("-");
    } else {
        if (AbilitiesData.length >0) {
            var comp = [];
            for(let i = 0; i < AbilitiesData.length; i++) {
                const tempAbility = AbilitiesData[i];
                comp.push(
                    <p style={{ textTransform: 'capitalize'}} key={`ability-compare-${i}-${tempAbility.name}`}>{ Util.isNullOrEmpty(tempAbility.name)? "": tempAbility.name }</p>
                );
            }
            return (comp);
        } else {
            return ("");
        }
    }
}

export const NameListWrapper = ({ data, variant, component }) => {
    if (Util.isNullOrUndefined(data)) {
        return ("-");
    } else {
        if (data.length >0) {
            var comp = [];
            for(let i = 0; i < data.length; i++) {
                const tempData = data[i];
                comp.push(
                    <Typography key={`name-list-wrapper-${i}`} style={{ textTransform: 'capitalize'}} align="center" variant={variant} component={component} >{ Util.isNullOrEmpty(tempData.name)? "": tempData.name }</Typography>
                );
            }
            return (comp);
        } else {
            return ("-");
        }
    }
}
NameListWrapper.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    variant: PropTypes.string,
    component: PropTypes.string,
};
NameListWrapper.defaultProps = {
    variant: "caption",
    component: "p",
};
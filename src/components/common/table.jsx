import React from 'react';

import TableHeader from './tableHeader';
import TableBody from './tableBody';

import PropTypes from 'prop-types';

const Table = (props) => {

    const { onSort, sortColumn, columns, data } = props;
    return (
        <table className="table">
            <TableHeader onSort={onSort} sortColumn={sortColumn} columns={columns} />
            <TableBody columns={columns} data={data} />
        </table>
    );
}

Table.propTypes = {
    sortColumn: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
};



export default Table;
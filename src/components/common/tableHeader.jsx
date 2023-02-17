import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/fontawesome-free-solid';

class TableHeader extends Component {


    raiseSort = (path) => {

        const sortColumn = { ...this.props.sortColumn };

        //path same as title
        if (path === sortColumn.path) {
            sortColumn.order = sortColumn.order === `asc` ? `dsc` : `asc`;
        }

        //path not same as title
        else {
            sortColumn.path = path;
            sortColumn.order = `asc`;
        }

        this.props.onSort(sortColumn);
    }

    renderSortIcon = (column) => {
        const { sortColumn } = this.props;
        //console.log(column, sortColumn);

        //for not currently sorted colums no icon
        if (column.path !== sortColumn.path) return null;

        if (column.path === sortColumn.path && sortColumn.order === `dsc`) return <FontAwesomeIcon icon={faSortUp} />;

        return <FontAwesomeIcon icon={faSortDown} />;

    }



    render() {

        return (
            <thead>
                <tr>
                    {this.props.columns.map(column =>
                        <th
                            className='clickable'
                            //key={column.path || column.key }
                            key={column.name || column.key}
                            onClick={() => {
                                //extra added
                                if (column.path) { this.raiseSort(column.path); }
                            }
                            }
                        >
                            {column?.name}
                            {this.renderSortIcon(column)}
                        </th>
                    )}
                </tr>
            </thead>


        );
    }
}


TableHeader.propTypes = {
    columns: PropTypes.array.isRequired,
    sortColumn: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
}

export default TableHeader;
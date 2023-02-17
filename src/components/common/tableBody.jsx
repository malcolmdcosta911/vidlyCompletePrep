import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { getNestedObject } from '../../utils/getNestedObject'

class TableBody extends Component {


    renderCell = (item, column ) => {
        //console.log(item);
        if (column.render) return column.render(item) ;
       return getNestedObject(item, column.path);
    };


    createKey = (item, column) => {
        return item._id + (column.path || column.key);
    };


    render() {

        const { data, columns } = this.props;
        // console.log(columns)
        return (
            <tbody>
                {data.map(item =>
                    <tr key ={item._id}>
                        {columns.map(column =>
                            <td key={this.createKey(item, column)}> {this.renderCell(item, column) }</td>
                        )}
                    </tr>

                )}
            </tbody>
        );
    }
}




TableBody.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
}


export default TableBody;
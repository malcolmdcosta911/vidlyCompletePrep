import React from 'react';
import PropTypes from 'prop-types';

const ListGroup = ({ items, onItemSelect, valueProperty = "_id", textProperty = "name", selectedItem }) => {

    return (
        <ul className="list-group">
            {items.map(item =>
                <li
                    className={item===selectedItem ? "list-group-item active" : "list-group-item" }
                    key={item[valueProperty]}
                    onClick={() => onItemSelect(item)}
                >
                    {item[textProperty]}
                </li>
            )}
        </ul>
    );
}

ListGroup.propTypes = {
    items: PropTypes.array.isRequired,
    onItemSelect: PropTypes.func.isRequired,
   // selectedItem: PropTypes.object.isRequired,
};



export default ListGroup;
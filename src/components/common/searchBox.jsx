import React, { Component } from 'react';




class SearchBox extends Component {

    render() { 
        const {  type="text",  value, onChange} =this.props;
        return (
            <input
               // id={name}
                name="query"
                className='form-control my-3'
                type={type}
                value={value}
                placeholder="Search..."
                onChange={(e)=>onChange(e.currentTarget.value)}
            //autoFocus
            />
        );
    }
}
 
export default SearchBox;
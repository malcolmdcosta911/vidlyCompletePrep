import React from 'react';


const Input = ({ name, label, error, ...rest }) => {
    return (
        <div className="form-group mb-3">
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                // type={type}
                {...rest}
                className="form-control"
                //autoFocus
                // value={value}
                // onChange={onChange}
            //  ref={this.username}
            />
            {error && <div className="alert alert-danger" >{error}</div>}
        </div>
    );
}

export default Input;
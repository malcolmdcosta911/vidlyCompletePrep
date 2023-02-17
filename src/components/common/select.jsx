import React from 'react';

const Select = ({ name, label, error, optionArr, ...rest }) => {
    return (
        <div className="form-group mb-3">
            <label
                htmlFor={name}
            >{label}</label>
            <select
                name={name}
                className="form-control"
                {...rest}
                >
                <option value="" />
                {optionArr?.length&& optionArr.map(data =>
                <option
                    key={data._id}
                    value={data._id}
                >{data.name}
                </option>)
                }        
            </select>
            {error && <div className="alert alert-danger" >{error}</div>}
        </div>

    );
}

export default Select;
import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';

class Form extends Component {
    state = { data: {}, error: {} };

    validate = () => {
        const { error } = Joi.validate(this.state.data, this.schema, { abortEarly: false });
        if (!error) return null;
        const errors = {};
        for (let obj of error.details) { errors[obj.path[0]] = obj.message; }
        return errors;
    }


    validateProperty = (input) => {
        const obj = { [input.name]: input.value };
        const schema = { [input.name]: this.schema[input.name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    }


    handleSubmit = (event) => {
        event.preventDefault();

        //handle error locally if present
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;
        this.doSubmit();

    }

    //handleChange = (event) => {
    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);

        if (errorMessage) { errors[input.name] = errorMessage; }
        else { delete errors[input.name]; }

        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, errors });
    }

    renderInput = (name, label, type="text") => {
        const { data, errors } = this.state;

        return (<Input
            name={name}
            label={label}
            value={data[name]}
            error={errors[name]}
            onChange={this.handleChange}
            type={type}
        />);
    }


    renderSelect = (name, label, optionArr)=>{
        const { data, errors } = this.state;
        return <Select
            name={name}
            label={label}
            value={data[name]}
            optionArr={optionArr}
            error={errors[name]}
            onChange={this.handleChange}
          />
}

    renderButton = (label) => {
        return (<button
            disabled={this.validate()}
            type="submit"
            className="btn btn-primary" >{label}</button>);
    }

}

export default Form;
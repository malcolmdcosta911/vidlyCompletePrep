import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { register } from '../services/userService.js';
import { useNavigate } from 'react-router-dom';
import auth from '../services/authService';

class RegisterForm extends Form {
    state = { data: { username: '', password: '', name: '' }, errors: {} };


    schema = {
        username: Joi.string().email().required().label('Username'),
        password: Joi.string().required().label('Password').min(5),
        name: Joi.string().required().label('Name'),
    };

    doSubmit = async () => {
        console.log(`submitted`);
        try {
            const { headers } = await register(this.state.data);
            const jwt = headers["x-auth-token"];
            auth.loginWithJwt(jwt);
            // this.props.navigate("/");
            window.location = '/';
        }
        catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', "Username")}
                    {this.renderInput('password', "Password", 'password')}
                    {this.renderInput('name', "Name")}
                    {this.renderButton("Register")}
                </form>
            </React.Fragment>
        );
    }
}



const withRouter = WrappedComponent => props => {

    const navigate = useNavigate();

    return <WrappedComponent
        {...props}
        navigate={navigate}
    />;
}


export default withRouter(RegisterForm);

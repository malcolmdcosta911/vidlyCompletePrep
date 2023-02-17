import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import auth from '../services/authService';
import { useLocation, useNavigate } from 'react-router-dom';
class LoginForm extends Form {

    state = { data: { username: '', password: '' }, errors: {} };

    // componentDidMount(){
    //     this.username.current.focus();
    // }

    // username=React.createRef();

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password'),
    };


    doSubmit = async () => {
        const { data } = this.state;

        try {
            await auth.login(data.username, data.password);
            // this.props.navigate("/");
            const {state:currentLocation}=this.props.location;
            window.location = currentLocation?.from ? currentLocation.from :'/';

        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
        // console.log(`submitted`);
        //make server call
    }


    render() {
       // console.log('location', this.props.location);
if(auth.getCurrentUser()) return this.props.navigate("/");

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', "Username")}
                    {this.renderInput('password', "Password", 'password')}
                    {this.renderButton("Login")}
                </form>
            </div>
        );
    }
}




const withRouter = WrappedComponent => props => {

    const navigate = useNavigate();
    const location=useLocation();
    return <WrappedComponent
            navigate={navigate}
            location={location}
            {...props}
    />
}


export default withRouter(LoginForm);





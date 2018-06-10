import React from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '../api/api';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMsg: '',
            redirectToHome: false,
        };
    }

    handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        login(this.state.email, this.state.password, (data) => {
            if (data.error) {
                this.setState({ errorMsg: data.error });
            } else {
                this.setState({ redirectToHome: true });
            }
        });
    };

    render() {
        if (this.state.redirectToHome) {
            return <Redirect to={{ pathname: '/' }} />;
        }

        return (
            <div className="login">
                <form className="login-form" onSubmit={this.handleSubmit} >
                    <input name="email" type="text" onChange={this.handleChange} placeholder="email" />
                    <input name="password" type="password" onChange={this.handleChange} placeholder="password" />
                    <p className="err-msg">{this.state.errorMsg}</p>
                    <input type="submit" className="btn-login" value="Login" />
                </form>
            </div>
        );
    }
}

export default LoginForm;
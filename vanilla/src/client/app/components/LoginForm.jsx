import React from 'react';

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
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
    };

    render() {
        return (
            <form className="login-form" onSubmit={this.handleSubmit} >
                <input name="email" type="text" onChange={this.handleChange} placeholder="email" />
                <input name="password" type="password" onChange={this.handleChange} placeholder="password" />
                <input type="submit" className="btn-login" value="Login" />
            </form>
        );
    }
}

export default LoginForm;
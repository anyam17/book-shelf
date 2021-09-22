import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginComponent from '../../components/Auth/Login';
import { loginUser } from '../../actions/auth';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuth) {
            this.props.history.push('/user');
        }
    }

    // handleInput = (e) => {
    //     const { name, value } = e.target;

    //     this.setState({
    //         [name]: value,
    //     });
    // }

    submitForm = (values) => this.props.dispatch(loginUser(values));

    render() { 
        return (
            <div>
                <LoginComponent
                    {...this.state}
                    {...this.props}
                    handleInput={this.handleInput}
                    submitForm={this.submitForm}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth.auth,
        message: state.auth.message,
        isLoading: state.auth.isLoading,
    }
}

export default connect(mapStateToProps)(Login);
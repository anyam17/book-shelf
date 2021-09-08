import React, { Component } from 'react';
import { connect } from 'react-redux';

import RegisterComponent from '../../components/Auth/Register';
import { registerUser } from '../../actions/auth';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            error: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuth) {
            this.props.history.push('/user');
        }
    }

    handleInput = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        });
    }

    submitForm = (e) => {
        e.preventDefault();

        this.props.dispatch(registerUser(this.state));
    }

    render() {

        return (
                <RegisterComponent
                    {...this.state}
                    handleInput={this.handleInput}
                    submitForm={this.submitForm}
                />
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth.auth
    }
}

export default connect(mapStateToProps)(Register);
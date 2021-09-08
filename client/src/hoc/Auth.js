import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../actions/auth';

import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';

export default function (ComposedClass, reload) {
    class AuthenticationCheck extends Component {
        constructor(props) {
            super(props);

            this.state = {
                loading: true
            }
        }

        componentWillMount() {
            this.props.dispatch(auth());
        }

        componentWillReceiveProps(nextProps) {
            this.setState({loading: false});

            if(!nextProps.auth.isAuth) {
                if(reload) {
                    this.props.history.push('/login');
                }
            } else {
                if(reload === false) {
                    this.props.history.push('/user');
                }
            }
        }

        render() {

            if(this.state.loading) {
                return (
                    <Container component="main" maxWidth="xs" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center', marginTop: '20%'}}>
                        <CircularProgress color="primary" />
                    </Container>
                )
            }

            return <ComposedClass {...this.props} user={this.props.user} />
        }
    }

    function mapStateToProps(state) {
        return {
            auth: state.auth.auth
        }
    }

    return connect(mapStateToProps)(AuthenticationCheck);
}
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AccountComponent from '../components/Account/Account';

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div>
                <AccountComponent {...this.props.auth} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth.auth
    }
}

export default connect(mapStateToProps)(Account);
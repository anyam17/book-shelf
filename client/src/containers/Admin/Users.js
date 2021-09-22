import React from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions/user";

import UserComponent from "../../components/Admin/Users";

class Users extends React.Component {
    componentWillMount() {
        this.props.dispatch(getUsers());
    }

    render() {
        if (this.props.isEmpty) {
            return (
                <h1 style={{ textAlign: "center", marginTop: "15%" }}>
                    No Records Found
                </h1>
            );
        }

        return (
            <div>
                <UserComponent users={this.props.users} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.user.users,
        // isEmpty: state.filter.isEmpty,
    };
}

export default connect(mapStateToProps)(Users);

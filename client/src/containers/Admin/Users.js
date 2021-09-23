import React from "react";
import { connect } from "react-redux";
import { getUsers, setRole, setStatus, deleteUser } from "../../actions/user";

import UserComponent from "../../components/Admin/Users";
import AlertDialog from "../../components/Gadgets/AlertDialog";

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            open: false,
            name: "",
        };
    }

    componentWillMount() {
        this.props.dispatch(getUsers());
    }

    handleSetRole = (e, role, userId) => {
        e.preventDefault();
        this.props.dispatch(setRole(userId, role));
    };

    handleSetStatus = (e, userId) => {
        e.preventDefault();
        this.props.dispatch(setStatus(userId, e.target.checked));
    };

    handleDeleteDialog = (e, userId, nameOfUser) => {
        e.preventDefault();
        this.setState({ userId, name: nameOfUser, open: true });
    };

    handleDeleteUser = () => {
        this.props.dispatch(deleteUser(this.state.userId, this.props.auth.id))
        this.handleClose();
    };

    handleClose = () => {
        this.setState({ open: false});
    };

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
                <UserComponent 
                    users={this.props.users} 
                    message={this.props.message}
                    success={this.props.success}
                    handleSetRole={this.handleSetRole}
                    handleSetStatus={this.handleSetStatus}
                    handleDeleteDialog={this.handleDeleteDialog}
                />

                <AlertDialog
                    title={"Confirmation"}
                    text={`Are you sure you want to delete user ** ${this.state.name}**?`}
                    handleDelete={this.handleDeleteUser}
                    handleClose={this.handleClose}
                    open={this.state.open}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth.auth,
        users: state.user.users,
        isEmpty: state.filter.isEmpty,
        message: state.user.message,
        success: state.user.success,
    };
}

export default connect(mapStateToProps)(Users);

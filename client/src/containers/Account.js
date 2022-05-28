import React, { Component } from "react";
import { connect } from "react-redux";

import AccountComponent from "../components/Account/Account";
import { uploadProfilePhoto, clearProfilePhoto } from "../actions/user";
import { auth } from "../actions/auth";

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.auth.id,
            photoId: this.props.auth.photoId || "",
            photo: "",
            type: "",
        };
    }

    componentWillUnmount = () => this.props.dispatch(clearProfilePhoto());

    handleFile = (e) => {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;

        let type = files[0].type.split("/")[1];
        this.setState({
            photo: files[0],
            type: type,
        });
    };

    handleUpload = () => {
        const formData = new FormData();
        formData.append("userId", this.state.userId);
        formData.append("photo", this.state.photo);
        formData.append("type", this.state.type);
        
        this.props.dispatch(uploadProfilePhoto(formData, this.state.photoId));
        this.props.dispatch(auth());
    }

    render() {
        const { photoId, isAuth, ...rest } = this.props.auth;
        
        return (
            <div>
                <AccountComponent 
                    {...rest} 
                    {...this.props.user}
                    message={this.props.message}
                    success={this.props.success}
                    handleFile={this.handleFile} 
                    handleUpload={this.handleUpload} 
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth.auth,
        user: state.user.auth,
        message: state.user.message,
        success: state.user.success,
    };
}

export default connect(mapStateToProps)(Account);

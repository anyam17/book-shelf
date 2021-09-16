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

    // Image upload function...
    createImage = (file) => {
        let type = file.type.split("/")[1];
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({
                photo: e.target.result,
                size: file.size,
                type: type,
            });
        };
        reader.readAsDataURL(file);
    };

    handleFile = (e) => {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.createImage(files[0]);
    };

    handleUpload = () => {
        this.props.dispatch(uploadProfilePhoto(this.state));
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

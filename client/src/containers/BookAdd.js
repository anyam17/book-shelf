import React, { Component } from "react";
import { connect } from "react-redux";

import BookAddComponent from "../components/Book/BookAdd";
import { addBook } from "../actions/book";

class BookAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            author: "",
            ownerId: this.props.auth.auth.id,
            review: "",
            rating: "3",
            pages: "",
            price: "",
            file: "",
            size: "",
            type: "",
        };

        this.initialState = { ...this.state };
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.success) this.resetForm();
    };

    handleInput = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        });
    };

    // Image upload function...
    createImage = (file) => {
        let type = file.type.split("/")[1];
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({
                file: e.target.result,
                size: file.size,
                type: type
            });
        };
        reader.readAsDataURL(file);
    };

    handleFile = (e) => {

        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.createImage(files[0]);
    };

    submitForm = (e) => {
        e.preventDefault();

        this.props.dispatch(addBook(this.state));
    };

    resetForm = () => this.setState(this.initialState);

    render() {
        return (
            <div>
                <BookAddComponent
                    {...this.state}
                    message={this.props.message}
                    isLoading={this.props.isLoading}
                    handleInput={this.handleInput}
                    handleFile={this.handleFile}
                    submitForm={this.submitForm}
                    resetForm={this.resetForm}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        message: state.books.message,
        success: state.books.success,
        isLoading: state.books.isLoading,
    };
}

export default connect(mapStateToProps)(BookAdd);

import React, { Component } from "react";
import { connect } from "react-redux";
import { reset } from "redux-form";

import BookAddComponent from "../components/Book/BookAdd";
import { uploadBook } from "../actions/book";
import { validateForm } from "../utils";

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
            price: 0,
            file: "",
            size: "",
            type: "",
            errors: {},
            fileName: ""
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
        let fileName = file.name;
        let reader = new FileReader();
        let validate = validateForm(file);

        if (validate.isValidForm) {
            reader.onload = (e) => {
                this.setState({
                    // file: e.target.result,
                    file: file,
                    size: file.size,
                    type: type,
                    fileName: fileName,
                    isValidForm: true,
                    errors: {},
                });
            };

            reader.readAsDataURL(file);
        } else this.setState({ errors: validate.errors, isValidForm: validate.isValidForm, fileName });
    };

    handleFile = (e) => {
        let files = e.target.files || e.dataTransfer.files;
        
        if (!files.length) return;
        this.createImage(files[0]);
        this.getNumPages(files[0]);
    };

    getNumPages = (file) => {
        let reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onloadend = (e) => {
            let count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
            this.setState({pages: count})
        }

        return;
    }

    submitForm = (values) => {
        const { ownerId, review, rating, file, fileName, size, type, price, pages, isValidForm } = this.state;
        const { name, author } = values;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("fileName", fileName);
        formData.append("author", author);
        formData.append("ownerId", ownerId);
        formData.append("review", review);
        formData.append("rating", rating);
        formData.append("pages", pages);
        formData.append("price", price);
        formData.append("file", file);
        formData.append("size", size);
        formData.append("type", type);

        if (isValidForm) this.props.dispatch(uploadBook(formData));
    };

    // resetForm = () => this.setState(this.initialState);
    resetForm = () => {
        this.props.dispatch(reset("BookAddForm"));
        this.setState(this.initialState);
    }

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

import React from "react";
import { connect } from "react-redux";
import { getMyBooks, clearBooks, deleteBook } from "../actions/book";

import BookMyComponent from "../components/Book/BookMy";
import AlertDialog from "../components/Gadgets/AlertDialog";
import BookEdit from "../components/Book/BookEdit";

class BookMy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            open: false,
            openEdit: false,
            name: "",
            author: "",
            ownerId: this.props.auth.id,
        };
    }

    componentWillMount = () => {
        this.props.dispatch(getMyBooks(this.props.auth.id));
    };

    componentWillUnmount() {
        this.props.dispatch(clearBooks());
    }

    handleDialog = (e, id, nameOfBook) => {
        e.preventDefault();
        this.setState({ id: id, name: nameOfBook, open: true });
    };

    handleDelete = () => {
        this.props.dispatch(deleteBook(this.state.id, this.state.ownerId));
        this.handleClose();
    };

    handleEditDialog = (e, book) => {
        e.preventDefault();
        this.setState({
            id: book._id,
            name: book.name,
            author: book.author,
            openEdit: true,
        });
    };

    handleClose = () => {
        this.setState({ open: false, openEdit: false });
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
                <BookMyComponent
                    books={this.props.books}
                    handleDialog={this.handleDialog}
                    handleEditDialog={this.handleEditDialog}
                    message={this.props.message}
                    success={this.props.success}
                />
                <AlertDialog
                    title={"Confirmation"}
                    text={`Are you sure you want to delete ** ${this.state.name}**?`}
                    handleDelete={this.handleDelete}
                    handleClose={this.handleClose}
                    open={this.state.open}
                />
                <BookEdit
                    {...this.state}
                    handleEdit={this.handleEdit}
                    handleClose={this.handleClose}
                    open={this.state.openEdit}
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
        auth: state.auth.auth,
        books: state.filter.books,
        isEmpty: state.filter.isEmpty,
        message: state.books.message,
        success: state.books.success,
    };
}

export default connect(mapStateToProps)(BookMy);

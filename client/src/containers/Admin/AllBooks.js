import React from "react";
import { connect } from "react-redux";
import { getAllBooks, approveBook, clearBooks } from "../../actions/book";

import AllBooksComponent from "../../components/Admin/AllBooks";
import AlertDialog from "../../components/Gadgets/AlertDialog";

class AllBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookId: "",
            open: false,
            name: "",
        };
    }

    componentWillMount = () => {
        this.props.dispatch(getAllBooks());
    };

    componentWillUnmount() {
        this.props.dispatch(clearBooks());
    }

    handleApproveBook = (e, bookId) => {
        e.preventDefault();
        this.props.dispatch(approveBook(bookId, e.target.checked));
    };

    handleDeleteDialog = (e, bookId, nameOfBook) => {
        e.preventDefault();
        this.setState({ bookId, name: nameOfBook, open: true });
    };

    handleDeleteBook = () => {
        this.props.dispatch(approveBook(this.state.bookId, this.props.auth.id))
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
                <AllBooksComponent
                    books={this.props.books}
                    handleApproveBook={this.handleApproveBook}
                    handleDeleteDialog={this.handleDeleteDialog}
                    message={this.props.message}
                    success={this.props.success}
                />
                <AlertDialog
                    title={"Confirmation"}
                    text={`Are you sure you want to remove ** ${this.state.name}** from favorites?`}
                    handleDelete={this.handleDeleteBook}
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
        books: state.filter.books,
        isEmpty: state.filter.isEmpty,
        message: state.books.message,
        success: state.books.success,
    };
}

export default connect(mapStateToProps)(AllBooks);

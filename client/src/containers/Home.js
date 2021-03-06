import React from "react";
import { connect } from "react-redux";
import { getBooks, clearBooks } from "../actions/book";

import BookItem from "../components/Home/BookItem";

import Button from "@material-ui/core/Button";

class Home extends React.Component {
    componentWillMount() {
        this.props.dispatch(getBooks(12, 0, "desc"));
    }

    componentWillUnmount() {
        this.props.dispatch(clearBooks());
    }

    loadMore = () => {
        let numberOfBooks = this.props.books.length;
        this.props.dispatch(
            getBooks(12, numberOfBooks, "desc", this.props.books)
        );
    };

    renderItems = (books) =>
        books && books.length > 0
            ? books.map((book, i) => <BookItem {...book} key={book._id} />)
            :  <h1 style={{ textAlign: "center", marginTop: "15%" }}>
                    No Books have been added yet!
                </h1>;

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
                {this.renderItems(this.props.books)}

                {this.props.books && this.props.books.length > 11 ? (
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={this.loadMore}
                    >
                        Load More
                    </Button>
                ) : null}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        books: state.filter.books,
        isEmpty: state.filter.isEmpty,
    };
}

export default connect(mapStateToProps)(Home);

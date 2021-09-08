import React from 'react';
import { connect } from 'react-redux';
import { getMyBooks, clearBooks } from '../actions/book';

import BookItem from '../components/Home/BookItem';

class BookMy extends React.Component {

    componentWillMount = () => {
        this.props.dispatch(getMyBooks(this.props.auth.id));
    }

    componentWillUnmount() {
        this.props.dispatch(clearBooks());
    }

    renderItems = books => (
        books ?
            books.length > 0 ?
                books.map((book, i) => (
                    <BookItem {...book} key={book._id} />
                ))
            : <h1 style={{textAlign: 'center', marginTop: '15%'}}>Book List Empty</h1>
        : null
    )

    render() {
        if (this.props.isEmpty) {
            return <h1 style={{textAlign: 'center', marginTop: '15%'}}>No Records Found</h1>
        }

        return (
            <div>
                {this.renderItems(this.props.books)}
            </div>
        )
    }
};

function mapStateToProps(state) {
    return {
        auth: state.auth.auth,
        books: state.filter.books,
        isEmpty: state.filter.isEmpty,
    }
}

export default connect(mapStateToProps)(BookMy);
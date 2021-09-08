import React, { Component } from 'react';
import { connect } from 'react-redux';

import BookAddComponent from '../components/Book/BookAdd';
import { addBook } from '../actions/book';

class BookAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            author: '',
            ownerId: this.props.auth.auth.id,
            review: '',
            rating: '3',
            pages: '',
            price: ''
        }
    }

    handleInput = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        });
    }

    submitForm = (e) => {
        e.preventDefault();

        this.props.dispatch(addBook(this.state));
    }

    render() {
        console.log(this.props.auth.auth.id);
        return (
            <div>
                <BookAddComponent
                    {...this.state}
                    handleInput={this.handleInput}
                    submitForm={this.submitForm}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(BookAdd);
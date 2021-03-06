import React from "react";
import { connect } from "react-redux";
import { getFavorites, removeFromFavorites } from "../actions/book";

import FavoriteComponent from "../components/Favorite/Favorite";
import AlertDialog from "../components/Gadgets/AlertDialog";

class Favorite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favoriteId: "",
            open: false,
            name: "",
        };
    }

    componentWillMount = () => {
        this.props.dispatch(getFavorites(this.props.auth.id));
    };

    handleRemoveFromFavoritesDialog = (e, favoriteId, nameOfBook) => {
        e.preventDefault();
        this.setState({ favoriteId, name: nameOfBook, open: true });
    };

    handleRemoveFromFavorites = () => {
        this.props.dispatch(removeFromFavorites(this.state.favoriteId, this.props.auth.id))
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
                <FavoriteComponent
                    books={this.props.books}
                    handleRemoveFromFavoritesDialog={this.handleRemoveFromFavoritesDialog}
                    message={this.props.message}
                    success={this.props.success}
                />
                <AlertDialog
                    title={"Confirmation"}
                    text={`Are you sure you want to remove ** ${this.state.name}** from favorites?`}
                    handleDelete={this.handleRemoveFromFavorites}
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

export default connect(mapStateToProps)(Favorite);

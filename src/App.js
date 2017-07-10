import React from "react";
import { Route, Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelf from "./components/BookShelf";
import Search from "./components/Search";

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
            <Link to="/search">search</Link>
          </div>
          <div className="list-books-content">
            <div>
              {this.props.categories.map(shelf => {
                return (
                  <BookShelf
                    key={shelf}
                    books={this.props.books}
                    shelf={shelf}
                    onMoveBook={this.props.onMoveBook}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    books: [],
    categories: ["currentlyReading", "wantToRead", "read"]
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  }

  moveBook = (id, shelf) => {
    let newBooks = this.state.books.map(book => {
      if (book.id === id) {
        BooksAPI.update(book, shelf);
        book.shelf = shelf;
      }
      return book;
    });
    this.setState({ books: newBooks });
  };

  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() =>
            <BooksApp
              books={this.state.books}
              categories={this.state.categories}
              onMoveBook={this.moveBook}
            />}
        />

        <Route
          exact
          path="/search"
          render={() =>
            <Search books={this.state.books} onMoveBook={this.moveBook} />}
        />
      </div>
    );
  }
}

export default App;

import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelf from "./components/BookShelf";

class BooksApp extends React.Component {
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
        BooksAPI.update(book, shelf)
        book.shelf = shelf;
      }
      return book;
    });
    this.setState({ books: newBooks });
  };

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {this.state.categories.map(shelf => {
                return (
                  <BookShelf
                    key={shelf}
                    books={this.state.books}
                    shelf={shelf}
                    onMoveBook={this.moveBook}
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

export default BooksApp;

import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './components/BookShelf';
import Search from './components/Search';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>Eric's Read</h1>
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
                    currentLoc={this.props.currentLoc}
                    checkBookExists={this.props.checkBookExists}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">search</Link>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  }

  checkBookExists = rawBook => {
    for (let book of this.state.books) {
      if (book.id === rawBook.id) {
        return book.shelf;
      }
    }
    return false;
  };

  moveBook = (id, shelf, rawBook) => {
    let exists = this.checkBookExists(rawBook);
    if (exists) {
      let newBooks = this.state.books.map(book => {
        if (book.id === id) {
          BooksAPI.update(book, shelf);
          book.shelf = shelf;
        }
        return book;
      });
      this.setState({ books: newBooks });
    } else {
      rawBook.shelf = shelf;
      this.setState(prevState => ({
        books: prevState.books.concat([rawBook])
      }));
      BooksAPI.update(rawBook, shelf);
    }
  };

  render() {
    const categories = ['currentlyReading', 'wantToRead', 'read'];
    return (
      <div>
        <Route
          exact
          path="/"
          render={props => {
            return (
              <BooksApp
                books={this.state.books}
                categories={categories}
                onMoveBook={this.moveBook}
                currentLoc={props.location.pathname}
                checkBookExists={this.checkBookExists}
              />
            );
          }}
        />

        <Route
          exact
          path="/search"
          render={props =>
            <Search
              books={this.state.books}
              onMoveBook={this.moveBook}
              currentLoc={props.location.pathname}
              checkBookExists={this.checkBookExists}
            />}
        />
      </div>
    );
  }
}

export default App;

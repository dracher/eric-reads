import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../BooksAPI';
import _ from 'underscore';
// import escapeRegExp from 'escape-string-regexp';
// import sortBy from 'sort-by';

class Search extends React.Component {
  state = {
    query: '',
    queriedBooks: []
  };

  goSearch = (query, maxResults) => {
    BooksAPI.search(query, maxResults).then(books => {
      if (Array.isArray(books)) {
        this.setState({ queriedBooks: books });
      } else {
        this.setState({ queriedBooks: [] });
      }
    });
  };
  ff = _.debounce(() => console.log(this.state.query), 1000);
  updateQuery = query => {
    this.setState({ query: query }, this.ff);
  };

  handleKeyPress = e => {
    if (e.key === 'Enter' && this.state.query.length !== 0) {
      this.goSearch(this.state.query, 50);
      this.setState({ query: '' });
    }
  };

  render() {
    const { onMoveBook } = this.props;
    const { query } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author + '↵'"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.queriedBooks.length !== 0
              ? this.state.queriedBooks.map(book => {
                  return (
                    <li key={book.id}>
                      <Book
                        bid={book.id}
                        title={book.title}
                        authors={book.authors}
                        thumbnail={book.imageLinks.thumbnail}
                        shelf={'none'}
                        onMoveBook={onMoveBook}
                        currentLoc={this.props.currentLoc}
                        rawBook={book}
                      />
                    </li>
                  );
                })
              : <div>
                  <br />
                  <h1>No books found</h1>
                  {this.state.query}
                </div>}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;

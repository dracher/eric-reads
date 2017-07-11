import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../BooksAPI';
import _ from 'lodash';

class Search extends React.Component {
  state = {
    query: '',
    queriedBooks: []
  };

  debounceSearch = _.debounce(() => {
    BooksAPI.search(this.state.query, 50).then(books => {
      if (Array.isArray(books)) {
        this.setState({ queriedBooks: books });
      } else {
        this.setState({ queriedBooks: [] });
      }
    });
  }, 100);

  updateQuery = query => {
    this.setState({ query: query }, this.debounceSearch);
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
              placeholder="Search by title or author"
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
                        onMoveBook={onMoveBook}
                        currentLoc={this.props.currentLoc}
                        rawBook={book}
                        checkBookExists={this.props.checkBookExists}
                      />
                    </li>
                  );
                })
              : <div>
                  <br />
                  <h1>
                    {this.state.queriedBooks.length} books found
                    {this.state.query}
                  </h1>
                </div>}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;

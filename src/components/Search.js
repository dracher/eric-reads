import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";

class Search extends React.Component {
  state = {
    query: ""
  };

  updateQuery = query => {
    this.setState({ query: query.trim() });
  };

  render() {
    const { books, onMoveBook } = this.props;
    const { query } = this.state;

    let showingBooks;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      showingBooks = books.filter(book => match.test(book.title));
      if (showingBooks.length === 0) {
        showingBooks = books.filter(book => {
          return book.authors
            .map(author => match.test(author))
            .reduce((a, b) => a || b);
        });
      }
    } else {
      showingBooks = [];
    }
    showingBooks.sort(sortBy("title"));

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
            {showingBooks.map(book => {
              return (
                <li key={book.id}>
                  <Book
                    bid={book.id}
                    title={book.title}
                    authors={book.authors}
                    thumbnail={book.imageLinks.thumbnail}
                    shelf={book.shelf}
                    onMoveBook={onMoveBook}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;

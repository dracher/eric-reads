import React from 'react';
import Book from './Book';

class BookShelf extends React.Component {
  render() {
    const {
      shelf,
      books,
      onMoveBook,
      checkBookExists,
      currentLoc
    } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {shelf}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.filter(book => book.shelf === `${shelf}`).map(book => {
              return (
                <li key={book.id}>
                  <Book
                    onMoveBook={onMoveBook}
                    currentLoc={currentLoc}
                    rawBook={book}
                    checkBookExists={checkBookExists}
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

export default BookShelf;

import React from "react";
import Book from './Book'


class BookShelf extends React.Component {

  state = {
    books: this.props.books,
    shelf: this.props.shelf
  }

 componentWillReceiveProps(nextProps) {
   this.setState({books: nextProps.books})
 }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.state.books
              .filter(book => (book.shelf === `${this.props.shelf}`))
              .map(book => {
                return (
                  <li key={book.id}>
                    <Book
                      bid={book.id}
                      title={book.title}
                      authors={book.authors}
                      thumbnail={book.imageLinks.thumbnail}
                      shelf={book.shelf}
                      onMoveBook={this.props.onMoveBook}
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

import React from 'react';

class Book extends React.Component {
  handleSelect = e => {
    let destShelf = e.target.value;
    this.props.onMoveBook(this.props.rawBook.id, destShelf, this.props.rawBook);
  };

  render() {
    const currentShelf = this.props.checkBookExists(this.props.rawBook);
    const rawBook = this.props.rawBook;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${Object.is(rawBook.imageLinks, undefined)
                ? ''
                : rawBook.imageLinks.thumbnail}")`,
              backgroundRepeat: 'no-repeat round'
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={!currentShelf ? 'none' : currentShelf}
              onChange={this.handleSelect}
            >
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none" disabled>
                -------
              </option>
              {this.props.currentLoc === '/' &&
                <option value="none">Remove</option>}
            </select>
          </div>
        </div>
        {this.props.currentLoc === '/search' &&
          <div className="book-current-shelf">
            {currentShelf}
          </div>}
        <div className="book-title">
          {rawBook.title}
        </div>
        {!Object.is(rawBook.authors, undefined) &&
          rawBook.authors.map(author => {
            return (
              <div className="book-authors" key={author}>
                {author}
              </div>
            );
          })}
      </div>
    );
  }
}

export default Book;

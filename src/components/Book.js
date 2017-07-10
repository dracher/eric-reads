import React from 'react';

class Book extends React.Component {
  state = {
    currentShelf: this.props.shelf
  };

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    this.setState({ currentShelf: nextProps.shelf });
  }

  handleSelect = e => {
    let destShelf = e.target.value;
    console.log(destShelf);
    this.props.onMoveBook(this.props.bid, destShelf, this.props.rawBook);
  };

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${this.props.thumbnail}")`,
              backgroundRepeat: 'no-repeat round'
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={this.state.currentShelf}
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
        {/*{this.props.currentLoc === "/search" &&
          <div className="book-current-shelf">
            {this.state.currentShelf}
          </div>}*/}
        <div className="book-title">
          {this.props.title}
        </div>
        {!Object.is(this.props.authors, undefined) &&
          this.props.authors.map(author => {
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

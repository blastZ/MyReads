import React, { Component } from 'react'
import $ from 'jquery'

class Book extends Component {
    render() {
        return (
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.url})` }}></div>
                <div className="book-shelf-changer">
                  <select className=".mySelect">
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading" selected={this.props.bookshelf === 'Currently Reading' ? 'selected' : ''}>Currently Reading</option>
                    <option value="wantToRead" selected={this.props.bookshelf === 'Want to Read' ? 'selected' : ''}>Want to Read</option>
                    <option value="read" selected={this.props.bookshelf === 'Read' ? 'selected' : ''}>Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{this.props.title}</div>
              <div className="book-authors">{this.props.authors}</div>
            </div>
        )
    }
}

export default Book

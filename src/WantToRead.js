import React, { Component } from 'react'
import Book from './Book.js'

class WantToRead extends Component {
    change = (resultBookshelf, index) => {
        this.props.onChangeBookshelf('wantToRead', resultBookshelf, index)
    }
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">{
                        this.props.bookList.map((book) => (
                            <li key={book.title}><Book onChange={this.change} bookshelf='wantToRead' title={book.title} authors={book.authors} url={book.url}/></li>
                        ))
                    }</ol>
                </div>
            </div>
        )
    }
}

export default WantToRead

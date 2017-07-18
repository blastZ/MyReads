import React, { Component } from 'react'
import Book from './Book.js'

class CurrentlyReading extends Component {
    change = (resultBookshelf, index) => {
        this.props.onChangeBookshelf('currentlyReading', resultBookshelf, index)
    }
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">{
                        this.props.bookList.map((book) => (
                            <li key={book.title}><Book onChange={this.change} bookshelf='currentlyReading' title={book.title} authors={book.authors} url={book.url}/></li>
                        ))
                    }</ol>
                </div>
            </div>
        )
    }
}

export default CurrentlyReading

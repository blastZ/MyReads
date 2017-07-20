import React, { Component } from 'react'
import Book from './Book.js'

class BookShelf extends Component {
    change = (id, resultBookshelf) => {
        this.props.onChangeBookshelf(id, resultBookshelf)
    }
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">{
                        this.props.bookList.map((book) => (
                            <li key={book.title}><Book id={book.id} onChange={this.change} bookshelf={book.shelf} title={book.title} authors={book.authors} url={book.url}/></li>
                        ))
                    }</ol>
                </div>
            </div>
        )
    }
}

export default BookShelf

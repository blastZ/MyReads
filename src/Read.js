import React, { Component } from 'react'
import Book from './Book.js'

class Read extends Component {
    change = (resultBookshelf, index) => {
        this.props.onChangeBookshelf('read', resultBookshelf, index)
    }
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">{
                        this.props.bookList.map((book) => (
                            <li key={book.title}><Book onChange={this.change} bookshelf='read' title={book.title} authors={book.authors} url={book.url}/></li>
                        ))
                    }</ol>
                </div>
            </div>
        )
    }
}

export default Read

import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI.js'
import Book from './Book.js'
import { Link } from 'react-router-dom'

class SearchView extends Component {
    constructor() {
        super()
        this.searchTimeout = null
    }

    state = {
        resultList: []
    }

    queryChange = (e) => {
        const that = this
        const value = e.target.value
        if(this.searchTimeout) {
            clearTimeout(this.searchTimeout)
        }
        this.searchTimeout = setTimeout(function() {
            BooksAPI.search(value).then(function(result) {
                if(Array.isArray(result)) {
                    that.setState({resultList: result})
                } else {
                    that.setState({resultList: []})
                }
            })
        }, 300)
    }

    change = (id, resultBookshelf) => {
        this.props.onChangeBookshelf(id, resultBookshelf)
    }

    getShelf = (id) => {
        const bookList = this.props.bookList
        for(let i=0; i<bookList.length; i++) {
            if(bookList[i].id === id) {
                return (bookList[i].shelf)
            }
        }
        return 'none'
    }

    render() {
        return (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                  <input onChange={this.queryChange} type="text" placeholder="Search by title or author"/>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">{
                    this.state.resultList.map((result) => (
                        <li key={`${result.title}-${result.id}`}>
                            <Book onChange={this.change}
                                  id={result.id}
                                  bookshelf={this.getShelf(result.id)}
                                  title={result.title}
                                  authors={result.authors}
                                  url={result.imageLinks ? result.imageLinks.smallThumbnail : ''}/>
                        </li>
                    ))
                }</ol>
              </div>
            </div>
        )
    }
}

export default SearchView

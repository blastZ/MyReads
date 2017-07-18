import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI.js'
import Book from './Book.js'
import { Link } from 'react-router-dom'

class SearchView extends Component {
    state = {
        resultList: []
    }

    handleKeyPress = (e) => {
        const that = this
        if(e.key === 'Enter') {
            BooksAPI.search(e.target.value).then(function(result) {
                console.log(result)
                if(Array.isArray(result)) {
                    that.setState({resultList: result})
                } else {
                    window.alert('No terms matched your query.')
                }
            })
        }
    }

    render() {
        return (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                  <input onKeyPress={this.handleKeyPress} type="text" placeholder="Search by title or author"/>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">{
                    this.state.resultList.map((result) => (
                        <li key={result.id}>
                            <Book dataKey={result.id} bookshelf={result.shelf} title={result.title} authors={result.authors} url={result.imageLinks ? result.imageLinks.smallThumbnail : ''}/>
                        </li>
                    ))
                }</ol>
              </div>
            </div>
        )
    }
}

export default SearchView

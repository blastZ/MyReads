import React from 'react'
import * as BooksAPI from './BooksAPI'
import './css/App.css'
import SearchView from './SearchView.js'
import CurrentlyReading from './CurrentlyReading.js'
import WantToRead from './WantToRead.js'
import Read from './Read.js'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
    constructor() {
        super()
        const that = this
        let currentlyReadingList = [], wantToReadList = [], readList = []
        BooksAPI.getAll().then(function(result) {
            result.map((book) => {
                if(book.shelf === 'currentlyReading') {
                    currentlyReadingList.push({
                        id: book.id,
                        title: book.title,
                        authors: book.authors,
                        url: book.imageLinks.smallThumbnail
                    })
                } else if(book.shelf === 'wantToRead') {
                    wantToReadList.push({
                        id: book.id,
                        title: book.title,
                        authors: book.authors,
                        url: book.imageLinks.smallThumbnail
                    })
                } else if(book.shelf === 'read') {
                    readList.push({
                        id: book.id,
                        title: book.title,
                        authors: book.authors,
                        url: book.imageLinks.smallThumbnail
                    })
                }
            })
            that.setState({
                currentlyReadingList: currentlyReadingList,
                wantToReadList: wantToReadList,
                readList: readList
            })
        })
    }
    state = {
        currentlyReadingList: [],
        wantToReadList: [],
        readList: []
    }

    changeBookshelf = (originBookShelf, resultBookshelf, index) => {
        if(originBookShelf === 'currentlyReading') {
            this.setState((state) => {
                const book = state.currentlyReadingList.splice(index, 1)
                if(resultBookshelf === 'wantToRead') {
                    state.wantToReadList = state.wantToReadList.concat(book)
                    BooksAPI.update(book[0], 'wantToRead')
                }else if(resultBookshelf === 'read') {
                    state.readList = state.readList.concat(book)
                    BooksAPI.update(book[0], 'read')
                }
            })
        }else if(originBookShelf === 'wantToRead') {
            this.setState((state) => {
                const book = state.wantToReadList.splice(index, 1)
                if(resultBookshelf === 'currentlyReading') {
                    state.currentlyReadingList = state.currentlyReadingList.concat(book)
                    BooksAPI.update(book[0], 'currentlyReading')
                }else if(resultBookshelf === 'read') {
                    state.readList = state.readList.concat(book)
                    BooksAPI.update(book[0], 'read')
                }
            })
        }else if(originBookShelf === 'read') {
            this.setState((state) => {
                const book = state.readList.splice(index, 1)
                if(resultBookshelf === 'currentlyReading') {
                    state.currentlyReadingList = state.currentlyReadingList.concat(book)
                    BooksAPI.update(book[0], 'currentlyReading')
                }else if(resultBookshelf === 'wantToRead') {
                    state.wantToReadList = state.wantToReadList.concat(book)
                    BooksAPI.update(book[0], 'wantToRead')
                }
            })
        }
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/search" render={() => (
                    <SearchView/>
                )}/>
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <CurrentlyReading onChangeBookshelf={this.changeBookshelf} bookList={this.state.currentlyReadingList}/>
                            <WantToRead onChangeBookshelf={this.changeBookshelf} bookList={this.state.wantToReadList}/>
                            <Read onChangeBookshelf={this.changeBookshelf} bookList={this.state.readList}/>
                        </div>
                        <div className="open-search">
                            <Link to="search">Add a book</Link>
                        </div>
                    </div>
                )}/>
            </div>
        )
    }
}

export default BooksApp

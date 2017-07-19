import React from 'react'
import * as BooksAPI from './BooksAPI'
import './css/App.css'
import SearchView from './SearchView.js'
import CurrentlyReading from './CurrentlyReading.js'
import WantToRead from './WantToRead.js'
import Read from './Read.js'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
    state = {
        bookList: []
    }

    componentDidMount() {
        const that = this
        const bookList = []
        BooksAPI.getAll().then(function(result) {
            result.map((book) => {
                bookList.push({
                    id: book.id,
                    shelf: book.shelf,
                    title: book.title,
                    authors: book.authors,
                    url: book.imageLinks.smallThumbnail
                })
            })
            that.setState({
                bookList: bookList
            })
        })
    }

    changeBookshelf = (id, resultBookshelf) => {
        const that = this
        let isNew = true
        for(let i=0; i<this.state.bookList.length; i++) {
            if(this.state.bookList[i].id === id) {
                this.setState((state) => {
                    state.bookList[i].shelf = resultBookshelf
                })
                BooksAPI.update(this.state.bookList[i], resultBookshelf)
                isNew = false
                break
            }
        }
        if(isNew) {
            BooksAPI.get(id).then(function(result) {
                const authors = result.authors ? result.authors : ''
                const url = result.imageLinks ? result.imageLinks.smallThumbnail : ''
                that.setState((state) => {
                    state.bookList = state.bookList.concat([{
                        id: result.id,
                        shelf: resultBookshelf,
                        title: result.title,
                        authors: authors,
                        url: url
                    }])
                })
                BooksAPI.update(result, resultBookshelf)
            })
        }
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/search" render={() => (
                    <SearchView onChangeBookshelf={this.changeBookshelf} bookList={this.state.bookList}/>
                )}/>
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <CurrentlyReading onChangeBookshelf={this.changeBookshelf} bookList={this.state.bookList}/>
                            <WantToRead onChangeBookshelf={this.changeBookshelf} bookList={this.state.bookList}/>
                            <Read onChangeBookshelf={this.changeBookshelf} bookList={this.state.bookList}/>
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

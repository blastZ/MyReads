import React, { Component } from 'react'
import $ from 'jquery'

class Book extends Component {
    state = {
        value: this.props.bookshelf
    }

    change = (e) => {
        this.setState({value: e.target.value})
        const id = this.props.dataKey
        console.log(id)
        const index = $(e.target).parent().parent().parent().parent().index()
        const resultBookshelf = e.target.value
        this.props.onChange(resultBookshelf, index)
    }

    render() {
        return (
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.url})` }}></div>
                <div className="book-shelf-changer">
                  <select onChange={this.change} value={this.state.value}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{this.props.title}</div>
              <div className="book-authors" style={{display: 'flex', flexDirection: 'column'}}>{
                  this.props.authors ? this.props.authors.map((author) => (<span key={author.toString()}>{author}</span>)) : ''
              }</div>
            </div>
        )
    }
}

export default Book

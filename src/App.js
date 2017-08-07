import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import SearchBook from './SearchBook'

class BooksApp extends React.Component {
  state = {
    books:[],
    showSearchPage: false
  }

  componentDidMount(){
    this.getAllBooks()
  }

  getAllBooks(){
    BooksAPI.getAll().then((books)=>{
      this.setState({books})
    })
  }

  updateBookShelf = (book,newShelf)=>{
    BooksAPI.update(book, newShelf).then((res)=>{this.getAllBooks()})
  }

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
           <div className="list-books-content">
            <BookShelf books={this.state.books} onUpdate={this.updateBookShelf} shelf='currentlyReading' title='Currently Reading'/>
            <BookShelf books={this.state.books} onUpdate={this.updateBookShelf} shelf='wantToRead' title='Want to Read'/>
            <BookShelf books={this.state.books} onUpdate={this.updateBookShelf} shelf='read' title='Read'/>
          </div>
        </div>
        <div className="open-search">
           <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
    </div>
    )
  }
}

export default BooksApp

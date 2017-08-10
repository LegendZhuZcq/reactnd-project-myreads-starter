import React from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import SearchBook from './SearchBook'

class BooksApp extends React.Component {
    MAXSEARCHRESULT = 20

  state = {
    books:[],
    searchBooks:[]
  }

  componentDidMount(){
    this.getAllBooks()
  }

  getAllBooks(){
    BooksAPI.getAll().then((books)=>{
      this.setState({books})
    })
  }

  updateBookShelf=(book,newShelf)=>{
    BooksAPI.update(book, newShelf).then((res)=>{this.getAllBooks()})
  }

  updateQuery=(query)=>{
    BooksAPI.search(query,this.MAXSEARCHRESULT).then((searchBooks)=>{
        this.setState({searchBooks})
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
           <div className="list-books-content">
            <BookShelf books={this.state.books} onUpdate={this.updateBookShelf} shelf='currentlyReading' title='Currently Reading'/>
            <BookShelf books={this.state.books} onUpdate={this.updateBookShelf} shelf='wantToRead' title='Want to Read'/>
            <BookShelf books={this.state.books} onUpdate={this.updateBookShelf} shelf='read' title='Read'/>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
         </div>
       </div>
      )}/>
      <Route path="/search" render={({history})=>(
        <SearchBook
          searchBooks={this.state.searchBooks}
          updateQuery={this.updateQuery}
          onUpdate ={this.updateBookShelf}
        />
      )}/>
  </div>)
  }
}

export default BooksApp

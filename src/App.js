import React from 'react'
import {Route, Link, Switch} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import SearchBook from './SearchBook'
import NoMatch from './NoMatch'

class BooksApp extends React.Component {

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
        const selectedID = book.id //get the id of the book to be updated
    BooksAPI.update(book, newShelf).then((book)=>{
        let copyOfStateBooks = this.state.books;
        let updatedStateBooks = copyOfStateBooks.map(function(updateBook){
          console.log(updateBook.id, selectedID)
          if(updateBook.id === selectedID) updateBook.shelf = newShelf // update the selectedBook Shelf from a copy of State
          return updateBook
        })
        this.setState({books:updatedStateBooks}) //update the State with new books lists
    })
  }

  updateSearchBooks=(book,newShelf)=>{
    BooksAPI.update(book, newShelf)
  }

  updateQuery=(query)=>{
    const MAX_SEARCH_RESULT = 20;
    if(query!==''){
      BooksAPI.search(query,MAX_SEARCH_RESULT).then((searchBooks)=>{
          if(Array.isArray(searchBooks)){this.setState({searchBooks})} else {
            this.setState({searchBooks:[]})
          }

      })
    }else {
      this.setState({searchBooks:[]})
    }
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
             <div className="list-books-content">
              <BookShelf books={this.state.books.filter(book => book.shelf === 'currentlyReading')} onUpdate={this.updateBookShelf} shelf='currentlyReading' title='Currently Reading'/>
              <BookShelf books={this.state.books.filter(book => book.shelf === 'wantToRead')} onUpdate={this.updateBookShelf} shelf='wantToRead' title='Want to Read'/>
              <BookShelf books={this.state.books.filter(book => book.shelf === 'read')} onUpdate={this.updateBookShelf} shelf='read' title='Read'/>
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
            onUpdate={this.updateSearchBooks}
          />
        )}/>
      <Route component={NoMatch}/>
    </Switch>
  </div>)
  }
}

export default BooksApp

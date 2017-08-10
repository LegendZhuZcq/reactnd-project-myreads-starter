import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book'


class BookShelf extends Component{
  static propTypes={
    books:PropTypes.array.isRequired,
    shelf:PropTypes.string,
    title:PropTypes.string.isRequired,
    onUpdate:PropTypes.func
  }


 render(){

     const{books, shelf,title, onUpdate}=this.props
     const match = new RegExp(shelf)
     let showingBooks = books.filter((book)=>match.test(book.shelf))
     return(
             <div className="bookshelf">
               <h2 className="bookshelf-title">{title}</h2>
                 <div className="bookshelf-books">
                   <ol className="books-grid">
                     {showingBooks.map((book)=>(
                       <Book key={book.id} book={book} updateShelf={onUpdate}/>
                     ))}
               </ol>
             </div>
           </div>
   )
 }
}

export default BookShelf

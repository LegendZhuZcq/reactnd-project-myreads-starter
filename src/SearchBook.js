import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book'
import {Link} from 'react-router-dom'


class SearchBook extends Component{
  static propTypes ={
    searchBooks:PropTypes.array,
    updateQuery:PropTypes.func.isRequired,
    onUpdate:PropTypes.func
  }

  state ={query:' '}

  updateQuery =(input) =>{
    if(input!== ''){
      this.setState({query:input.trim()})
    }
  }

  render() {
       const {searchBooks,updateQuery,onUpdate}=this.props
       return (
       <div className="search-books">
         <div className="search-books-bar">
           <Link to='/' className="close-search">Close</Link>
           <div className="search-books-input-wrapper">
               <input type="text" placeholder="Search by title or author" onChange={(e)=>updateQuery(e.target.value)}/>
           </div>
         </div>
         <div className="search-books-results">
          <ol className="books-grid">
             {searchBooks.map((book)=>(
               <Book key={book.id} book={book} updateShelf={onUpdate}/>
             ))}
           </ol>
         </div>
       </div>
     )
   }
}

export default SearchBook

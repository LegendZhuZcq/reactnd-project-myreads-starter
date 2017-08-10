import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book'


class SearchBook extends Component{
  static propTypes ={
    searchBooks:PropTypes.array,
    updateQuery:PropTypes.func.isRequired,
    onUpdate:PropTypes.func
  }

  state ={query:''}

  updateQuery =(query) =>{
    this.setState({query:query.trim()})
  }

  componentWillMount(){
    this.props.updateQuery("")
  }

  render() {
       const {searchBooks,updateQuery,onUpdate}=this.props
       const {query}=this.state
       return (
       <div className="search-books">
         <div className="search-books-bar">
           <div className="search-books-input-wrapper">
               <input type="text" placeholder="Search by title or author" onChange ={(e)=>updateQuery(e.target.value)}/>
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

import React, { Component } from "react";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";

class Book extends Component{
  static propTypes={
    book:PropTypes.object.isRequired,
    updateShelf:PropTypes.func
  }

  state={
    currentShelf:this.props.book.shelf,
    book:this.props.book
  }

  updateShelf =(e)=>{
    this.props.updateShelf(this.props.book, e.target.value)
    this.setState({currentShelf:e.target.value})
  }
  getBookShelf=(bookID)=>{
    BooksAPI.get(this.props.book.id).then((book)=>{this.setState({currentShelf:book.shelf})})
  }

  componentDidMount(){
    this.getBookShelf(this.props.book.id)
  }
  
  render(){
        const{book}=this.props
        return(
          <li>
                         <div className="book">
                           <div className="book-top">
                             <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                               <div className="book-shelf-changer">
                                   <select
                                       value={this.state.currentShelf}
                                       onChange={this.updateShelf}
                                   >
                                       <option value="move" disabled>Move to...</option>
                                       <option value="currentlyReading">Currently Reading</option>
                                       <option value="wantToRead">Want to Read</option>
                                       <option value="read">Read</option>
                                       <option value="none">None</option>
                                   </select>
                               </div>
                           </div>
                           <div className="book-title">{book.title}</div>
                           <div className="book-authors">{book.authors}</div>
                         </div>
                       </li>

        )
  }
}

export default Book

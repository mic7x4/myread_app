import React from 'react'
// import * as BooksAPI from './BooksAPI'
import {Route,Switch} from 'react-router-dom'
import BooksList from './components/BooksList'
import SearchBooks from './components/SearchBooks'
import { debounce } from 'throttle-debounce';
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
  	books:[],
    searchResults:[],
    loading:true
  }
 async componentDidMount() {
    const books = await BooksAPI.getAll();
   this.setState({books,loading:false})
  }
	
    matchFromSearch = (book, shelf) => {
    const { books } = this.state;
    const found = books.find(item => item.id === book.id);
    if (!found)
      return this.setState((prevState) => ({
        books: prevState.books.concat({ ...book, shelf })
      }));
  };
   updateShelf = (selectedBook, newShelf) => {
    BooksAPI.update(selectedBook, newShelf);
    this.matchFromSearch(selectedBook, newShelf)
    return this.setState((prevState) => ({
      books: prevState.books.filter((item) =>
        item.id === selectedBook.id ? item.shelf = newShelf : item
      )
    }))
  }
   updateFromSearch = (results) => {
    const { books } = this.state;
    const { error } = results;
    return (
      !error && results.map((item) => {
        const found = books.find(book => book.id === item.id);
        return found ? found : item;
      })
    );
  };
  
  searchBooks = debounce(200,false,(query) => {
    if (query !== '') {
      this.setState({ loading: true })
      BooksAPI.search(query)
        .then((results) => {
          this.setState(() => ({
            searchResults: this.updateFromSearch(results),
            loading: false
          }))
        })
    }
  })

  render() {
    const { loading, books, searchResults } = this.state;
    console.log(this.state)
    return (
      <div>
      <Switch>
      	<Route exact path='/' render={()=>(<BooksList updateShelf={this.updateShelf} books={books} searchResults={searchResults} loading={loading} />)} />
	  	<Route path='/search' render={()=>(<SearchBooks loading={loading} searchResults={searchResults} updateShelf={this.updateShelf} searchBooks={this.searchBooks}/>)} />
      </Switch>
      </div>
    )
  }
}

export default BooksApp

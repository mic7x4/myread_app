import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book'
import { bookShelves } from '../utils/bookShelves';
import '../App.css'

const BooksList= ({ updateShelf, loading, books }) => {
  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Read</h1>
        </div>
        {loading ? 'Loading...' : (
          <div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  {bookShelves.map(({ name, value }) => (
                    <div key={value}>
                      <h2 className="bookshelf-title">{name}</h2>
                      <Book
                        books={books.filter((b) => b.shelf === value)}
                        onChange={updateShelf}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'></Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

BooksList.propTypes = {
  updateShelf: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  books: PropTypes.array.isRequired
}

export default BooksList;

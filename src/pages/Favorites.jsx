import React from 'react';

import Book from '../components/Book';

function Favorites({books, addFavorite, removeFavorite, searchFilter, favoriteBooks}) {

  return (
    <main>
      <div className='container'>
        <h2>Избранное</h2>
        <div className="books">
          {
            favoriteBooks.filter((book) => searchFilter(book)).map((book) => (
              <Book key={book.title} addFavorite={(obj) => addFavorite(obj)} removeFavorite={(cover) => removeFavorite(cover)} favoriteBooks={favoriteBooks} {...book} />
            ))
          }
        </div>
      </div>
    </main>
  )
};

export default Favorites;
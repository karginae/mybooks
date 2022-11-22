import React from 'react';

import Book from '../components/Book';
import Empty from '../components/Empty';

function Favorites({books, addFavorite, removeFavorite, searchFilter, favoriteBooks, cartBooks, addCart, removeCart}) {

  return (
    <main>
      <div className='container'>
        <h2>Избранное</h2>
        <div className="books">
            {favoriteBooks.length === 0 ? <Empty title={'Нет избранных товаров'} description={'Добавьте нужные товары'} button={{text: 'Вернуться в каталог', src: "/"}} /> : favoriteBooks.filter((book) => searchFilter(book)).map((book, index) => (
              <Book key={index} addFavorite={(obj) => addFavorite(obj)} removeFavorite={(title) => removeFavorite(title)} favoriteBooks={favoriteBooks} cartBooks={cartBooks} addCart={(obj) => addCart(obj)} removeCart={(title) => removeCart(title)} {...book} />
            ))}
        </div>
      </div>
    </main>
  )
};

export default Favorites;
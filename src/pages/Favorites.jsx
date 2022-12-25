import React from 'react';
import { useSelector } from 'react-redux';

import Book from '../components/Book';
import Empty from '../components/Empty';

function Favorites({addFavorite, removeFavorite, favoriteBooks, cartBooks, addCart, removeCart}) {
  const favorites = useSelector(state => state.favorites.data);

  return (
    <main>
      <div className='container'>
        <h2>Избранное</h2>
        <div className="books">
            {favorites?.length === 0 ? <Empty title={'Нет избранных товаров'} description={'Добавьте нужные товары'} button={{text: 'Вернуться в каталог', src: "/"}} /> : favorites?.map((favoriteBook, index) => (
              <Book key={index} addFavorite={(obj) => addFavorite(obj)} removeFavorite={(title) => removeFavorite(title)} favoriteBooks={favoriteBooks} cartBooks={cartBooks} addCart={(obj) => addCart(obj)} removeCart={(title) => removeCart(title)} {...favoriteBook.book} />
            ))}
        </div>
      </div>
    </main>
  )
};

export default Favorites;
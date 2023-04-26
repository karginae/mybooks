import React from 'react';
import { useSelector } from 'react-redux';

import Book from '../components/Book';
import Empty from '../components/Empty';

function Favorites() {
  const favorites = useSelector((state) => state.favorites.data);

  return (
    <main>
      <div className="container">
        <h2>Избранное</h2>
        <div className="books">
          {favorites?.length === 0 ? (
            <Empty
              title={'Нет избранных товаров'}
              description={'Добавьте нужные товары'}
              button={{ text: 'Вернуться в каталог', src: '/' }}
            />
          ) : (
            favorites?.map((favoriteBook, index) => <Book key={index} {...favoriteBook.book} />)
          )}
        </div>
      </div>
    </main>
  );
}

export default Favorites;

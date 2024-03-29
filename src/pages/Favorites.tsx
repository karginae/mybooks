import React from 'react';
import { useSelector } from 'react-redux';

import { Book, Empty, Button } from '../components';
import { RootState } from '../redux/store';

const Favorites: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites);

  return (
    <main>
      <div className="container">
        <h2>Избранное</h2>
        <div className="books">
          {favorites.status === 'loading' ||
            (favorites.data === null ? (
              <Empty title={'Ошибка загрузки данных'} description={'Что-то пошло не так...'} />
            ) : favorites.data.status === 401 ? (
              <Empty
                title={'Нет избранных товаров'}
                description={'Для добавления товаров в избранное необходимо быть авторизованным'}
              >
                <Button text="Войти/Зарегистрироваться" src="/auth" />
              </Empty>
            ) : favorites.data.length === 0 ? (
              <Empty title={'Нет избранных товаров'} description={'Добавьте нужные товары'}>
                <Button text="Вернуться в каталог" src="/" />
              </Empty>
            ) : (
              favorites.data.map((favoriteBook, index) => (
                <Book key={index} {...favoriteBook.book} />
              ))
            ))}
        </div>
      </div>
    </main>
  );
};

export default Favorites;

import React from 'react';
import { useSelector } from 'react-redux';

import Book from '../components/Book';
import Empty from '../components/Empty';
import ErrorBoundary from '../components/ErrorBoundary';
import { RootState } from '../redux/store';
import { BookData } from '../redux/types/booksType';

type HomeProps = {
  searchFilter: (book: BookData) => boolean;
};

const Home: React.FC<HomeProps> = ({ searchFilter }) => {
  const books = useSelector((state: RootState) => state.books.data);
  const readyBooks = !books ? [...Array(8)] : books.filter((book) => searchFilter(book));
  const renderBooks = () =>
    readyBooks.length ? (
      readyBooks.map((book, index) => (
        <ErrorBoundary key={index}>
          <Book key={index} {...book} />
        </ErrorBoundary>
      ))
    ) : (
      <Empty title={'Ничего не найдено'} button={{ text: 'Вернуться в каталог', src: '/' }} />
    );

  return (
    <main>
      <div className="container">
        <h2>Популярные книги</h2>
        <div className="books">
          {!books ? (
            renderBooks()
          ) : books.length ? (
            renderBooks()
          ) : (
            <Empty title={'Каталог пуст'} description={'Ожидайте публикации новых книг'} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;

import { useSelector } from 'react-redux';

import Book from '../components/Book';
import Empty from '../components/Empty';

function Home({ searchFilter }) {
  const books = useSelector((state) => state.books.data);
  const readyBooks = !books ? [...Array(8)] : books.filter((book) => searchFilter(book));
  const renderBooks = () =>
    readyBooks.length ? (
      readyBooks.map((book, index) => <Book key={index} {...book} />)
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
}

export default Home;

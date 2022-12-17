import Book from '../components/Book';
import Empty from '../components/Empty';

function Home({books, addFavorite, removeFavorite, searchFilter, favoriteBooks, cartBooks, addCart, removeCart, isLoading}) {
  const readyBooks = isLoading ? [...Array(8)] : books.filter((book) => searchFilter(book));
  const renderBooks = () => (
    readyBooks.length ? readyBooks.map((book, index) => (
      <Book key={index} addFavorite={(obj) => addFavorite(obj)} removeFavorite={(title) => removeFavorite(title)} favoriteBooks={favoriteBooks} cartBooks={cartBooks} addCart={(obj) => addCart(obj)} removeCart={(title) => removeCart(title)} isLoading={isLoading} {...book} />
    )) : <Empty title={'Ничего не найдено'} button={{text: 'Вернуться в каталог', src: '/'}} />
  )

  return (
    <main>
      <div className='container'>
        <h2>Популярные книги</h2>
        <div className="books">
          {
            isLoading ? renderBooks() : (books.length ? renderBooks() : <Empty title={'Каталог пуст'} description={'Ожидайте публикации новых книг'} />)
          }
        </div>
      </div>
    </main>
  )
};

export default Home;
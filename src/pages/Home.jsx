import Book from '../components/Book';

function Home({books, addFavorite, removeFavorite, searchFilter, favoriteBooks}) {
  return (
    <main>
      <div className='container'>
        <h2>Популярные книги</h2>
        <div className="books">
          {
            books.filter((book) => searchFilter(book)).map((book) => (
              <Book key={book.title} addFavorite={(obj) => addFavorite(obj)} removeFavorite={(cover) => removeFavorite(cover)} favoriteBooks={favoriteBooks} {...book} />
            ))
          }
        </div>
      </div>
    </main>
  )
};

export default Home;
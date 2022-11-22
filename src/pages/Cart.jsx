import Book from '../components/Book';
import Empty from '../components/Empty';

function Cart({books, addFavorite, removeFavorite, searchFilter, favoriteBooks, cartBooks, addCart, removeCart}) {
  return (
    <main>
      <div className='container'>
        <h2>Корзина</h2>
        <div className="books">
          {
            cartBooks.length === 0 ? <Empty title={'Ваша корзина пуста'} description={'Добавьте нужные товары'} button={{text: 'Вернуться в каталог', src: '/'}} /> : cartBooks.filter((book) => searchFilter(book)).map((book) => (
              <Book key={book.title} addFavorite={(obj) => addFavorite(obj)} removeFavorite={(title) => removeFavorite(title)} favoriteBooks={favoriteBooks} cartBooks={cartBooks} addCart={(obj) => addCart(obj)} removeCart={(title) => removeCart(title)} {...book} />
            ))
          }
        </div>
      </div>
    </main>
  )
};

export default Cart;
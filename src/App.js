import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import axios from './axios';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import BookDet from './pages/BookDet';
import Registration from './pages/Registration';
import Auth from './pages/Auth';
import CreateBook from './pages/CreateBook';
import Order from './pages/Order';
import { fetchAuthMe } from './redux/slices/authSlice';
import { fetchBooks } from './redux/slices/booksSlice';
import { fetchFavorites } from './redux/slices/favoritesSlice';
import { fetchCart } from './redux/slices/cartSlice';

function App() {
  const books = useSelector((state) => (state.books.data));
  // const [books, setBooks] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartBooks, setCartBooks] = React.useState([]);
  const [cartValue, setCartValue] = React.useState(0);
  const [favoriteBooks, setFavoriteBooks] = React.useState([]);
  const [favoritesValue, setFavoritesValue] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const dispatch = useDispatch();

  React.useEffect(() => {
    try {
      const data = dispatch(fetchAuthMe());
      // if (!data.email) {
      //   console.log('Ошибка авторизации!');
      // }
    } catch (error) {
      console.log('Ошибка авторизации');
    }
    const loadBooks = async () => {
      try {
        const [books, favoriteBooks, cartBooks] = await Promise.all([
          dispatch(fetchBooks()),
          // axios.get('/books'),
          dispatch(fetchFavorites()),
          // axios.get('/favorites'),
          // axios.get('/cart'),
          dispatch(fetchCart()),
        ]);
        if (!favoriteBooks.payload.status) {
          setFavoriteBooks(favoriteBooks.payload);
          setCartBooks(cartBooks.payload);
        }
        setIsLoading(false);
      } catch(error) {
        console.log('Ошибка загрузки данных');
      }
    }
    loadBooks();
  }, []);

  React.useEffect(() => {
    setFavoritesValue(favoriteBooks.length);
  }, [favoriteBooks]);

  React.useEffect(() => {
    setCartValue(cartBooks.length);
  }, [cartBooks]);

  const searchFilter = (book) => (book.title.toLowerCase().includes(searchValue.toLowerCase()) || book.author.toLowerCase().includes(searchValue.toLowerCase()));

  const addFavorite = async (id) => {
    try {
      const {data} = await axios.post('/favorites', id);
      setFavoriteBooks((prev) => ([...prev, data]));
    } catch(error) {
      alert('Ошибка добавления в избранные');
    }
  };

  const removeFavorite = async (id) => {
    try {
      const res = await axios.delete(`/favorites/${id}`);
      setFavoriteBooks((prev) => (prev.filter((favoriteBook) => (favoriteBook.book._id !== id))));
    } catch (error) {
      console.log(error);
    }
  };

  const addCart = async (id) => {
    try {
      const {data} = await axios.post('/cart', id);
      setCartBooks((prev) => ([...prev, data]));
    } catch(error) {
      console.log(error);
    }
  };

  const removeCart = async (id) => {
    try {
      const res = await axios.delete(`/cart/${id}`);
      setCartBooks((prev) => (prev.filter((cartBook) => (cartBook.book._id !== id))));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header getSearchValue={(obj) => (setSearchValue(obj))} favoritesValue={favoritesValue} cartValue={cartValue} />
      <Routes>
        <Route path='/' element={<Home books={books} addFavorite={addFavorite} removeFavorite={removeFavorite} searchFilter={searchFilter} favoriteBooks={favoriteBooks} isLoading={isLoading} />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/create-book' element={<CreateBook />} />
        <Route path='/:id/edit' element={<CreateBook />} />
        <Route path='/favorites' element={<Favorites books={books} addFavorite={addFavorite} removeFavorite={removeFavorite} favoriteBooks={favoriteBooks} cartBooks={cartBooks} addCart={addCart} removeCart={removeCart} />} />
        <Route path='/cart' element={<Cart books={books} addFavorite={addFavorite} removeFavorite={removeFavorite} favoriteBooks={favoriteBooks} cartBooks={cartBooks} addCart={addCart} removeCart={removeCart} />} />
        <Route path='order' element={<Order cartBooks={cartBooks} />} />
        <Route path='/:id' element={isLoading ? null : <BookDet books={books} cartBooks={cartBooks} addCart={addCart} removeCart={removeCart} />} />
      </Routes>
    </div>
  )
};
 
export default App;

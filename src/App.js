import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import qs from 'qs';

import Header from './components/Header';
import Footer from './components/Footer';
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
  const booksLoaded = useSelector((state) => state.books.status === 'loaded');
  const [searchValue, setSearchValue] = React.useState('');

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
        await Promise.all([
          dispatch(fetchBooks()),
          dispatch(fetchFavorites()),
          dispatch(fetchCart()),
        ]);
      } catch (error) {
        console.log('Ошибка загрузки данных');
      }
    };
    loadBooks();
  }, []);

  const searchFilter = (book) =>
    book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    book.author.toLowerCase().includes(searchValue.toLowerCase());

  return (
    <div className="body">
      <Header getSearchValue={(obj) => setSearchValue(obj)} />
      <Routes>
        <Route path="/" element={<Home searchFilter={searchFilter} />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/create-book" element={<CreateBook />} />
        <Route path="/:id/edit" element={<CreateBook />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/:id" element={!booksLoaded ? null : <BookDet />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

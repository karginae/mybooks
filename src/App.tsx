import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Header, Footer } from './components';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import BookDet from './pages/BookDet';
import Registration from './pages/Registration';
import Auth from './pages/Auth';
import Order from './pages/Order';
import { fetchAuthMe } from './redux/slices/authSlice';
import { fetchBooks } from './redux/slices/booksSlice';
import { fetchFavorites } from './redux/slices/favoritesSlice';
import { fetchCart } from './redux/slices/cartSlice';
import { RootState, useAppDispatch } from './redux/store';
import { BookData } from './redux/types/booksType';
import Fallback from './pages/Fallback';

const CreateBook = React.lazy(
  () => import(/* webpackChunkName: "CreateBook" */ './pages/CreateBook'),
);

function App() {
  const booksLoaded: boolean = useSelector((state: RootState) => state.books.status === 'loaded');
  const [searchValue, setSearchValue] = React.useState<string>('');

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    try {
      dispatch(fetchAuthMe());
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

  const searchFilter = (book: BookData) =>
    book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    book.author.toLowerCase().includes(searchValue.toLowerCase());

  return (
    <div className="body">
      <Header getSearchValue={(value: string) => setSearchValue(value)} />
      <Routes>
        <Route path="/" element={<Home searchFilter={searchFilter} />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/create-book"
          element={
            <Suspense fallback={<Fallback text={'Загрузка формы'} />}>
              <CreateBook />
            </Suspense>
          }
        />
        <Route
          path="/:id/edit"
          element={
            <Suspense fallback={<Fallback text={'Загрузка формы'} />}>
              <CreateBook />
            </Suspense>
          }
        />
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

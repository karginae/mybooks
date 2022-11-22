import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import BookDet from './pages/BookDet';

function App() {
  const [books, setBooks] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartBooks, setCartBooks] = React.useState([]);
  const [cartValue, setCartValue] = React.useState(0);
  const [favoriteBooks, setFavoriteBooks] = React.useState([]);
  const [favoritesValue, setFavoritesValue] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // axios.get('https://6369798728cd16bba71e5865.mockapi.io/books').then((res) => (setBooks(res.data)));
    const loadBooks = async () => {
      try {
        const books = await axios.get('https://6369798728cd16bba71e5865.mockapi.io/books');
        const favoriteBooks = await axios.get('https://6369798728cd16bba71e5865.mockapi.io/favorites');
        const cartBooks = await axios.get('https://6369798728cd16bba71e5865.mockapi.io/cart');
        
        setBooks(books.data);
        setFavoriteBooks(favoriteBooks.data);
        setCartBooks(cartBooks.data);
        
        setIsLoading(false);
      } catch(error) {
        alert(`Ошибка загрузки данных: ${error}`);
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

  const addFavorite = async (obj) => {
    try {
      const {data} = await axios.post('https://6369798728cd16bba71e5865.mockapi.io/favorites', obj);
      setFavoriteBooks((prev) => ([...prev, data]));
    } catch(error) {
      alert('Ошибка добавления в избранные');
    }
  };

  const removeFavorite = (title) => {
    const {id} = favoriteBooks.find((book) => (book.title === title));
    axios.delete(`https://6369798728cd16bba71e5865.mockapi.io/favorites/${id}`);
    setFavoriteBooks((prev) => (prev.filter((book) => (book.id !== id))));
  };

  const addCart = async (obj) => {
    try {
      const {data} = await axios.post('https://6369798728cd16bba71e5865.mockapi.io/cart', obj);
      setCartBooks((prev) => ([...prev, data]));
    } catch(error) {
      alert('Ошибка добавления в корзину');
    }
  };

  const removeCart = (title) => {
    const {id} = cartBooks.find((book) => (book.title === title));
    axios.delete(`https://6369798728cd16bba71e5865.mockapi.io/cart/${id}`);
    setCartBooks((prev) => (prev.filter((book) => (book.id !== id))));
  };

  return (
    <div>
      <Header getSearchValue={(obj) => (setSearchValue(obj))} favoritesValue={favoritesValue} cartValue={cartValue} />
      <Routes>
        <Route path='/' element={<Home books={books} addFavorite={addFavorite} removeFavorite={removeFavorite} searchFilter={searchFilter} favoriteBooks={favoriteBooks} isLoading={isLoading} />}></Route>
        <Route path='/favorites' element={<Favorites books={books} addFavorite={addFavorite} removeFavorite={removeFavorite} searchFilter={searchFilter} favoriteBooks={favoriteBooks} cartBooks={cartBooks} addCart={addCart} removeCart={removeCart} />}></Route>
        <Route path='/cart' element={<Cart books={books} addFavorite={addFavorite} removeFavorite={removeFavorite} searchFilter={searchFilter} favoriteBooks={favoriteBooks} cartBooks={cartBooks} addCart={addCart} removeCart={removeCart} />}></Route>
        <Route path={`/:id`} element={isLoading ? null : <BookDet books={books} cartBooks={cartBooks} addCart={addCart} removeCart={removeCart} />} />
      </Routes>
    </div>
  )
};
 
export default App;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  const [books, setBooks] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [favoriteBooks, setFavoriteBooks] = React.useState([]);
  const [favoritesValue, setFavoritesValue] = React.useState(0);

  React.useEffect(() => {
    axios.get('https://6369798728cd16bba71e5865.mockapi.io/books').then((res) => (setBooks(res.data)));
    axios.get('https://6369798728cd16bba71e5865.mockapi.io/favorites').then((res) => (setFavoriteBooks(res.data)));
  }, []);

  React.useEffect(() => {
    setFavoritesValue(favoriteBooks.length);
  }, [favoriteBooks]);

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

  const searchFilter = (book) => (book.title.toLowerCase().includes(searchValue.toLowerCase()) || book.author.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <div>
      <Header getSearchValue={(obj) => (setSearchValue(obj))} favoritesValue={favoritesValue} />
      <Routes>
        <Route path='/' element={<Home books={books} addFavorite={addFavorite} removeFavorite={removeFavorite} searchFilter={searchFilter} favoriteBooks={favoriteBooks} />}></Route>
        <Route path='/favorites' element={<Favorites books={books} addFavorite={addFavorite} removeFavorite={removeFavorite} searchFilter={searchFilter} favoriteBooks={favoriteBooks} />}></Route>
      </Routes>
    </div>
  )
};
 
export default App;

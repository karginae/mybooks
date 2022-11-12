import React from 'react';
import axios from 'axios';

import Header from './components/Header';
import Book from './components/Book';

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

  const addFavorite = (obj) => {
    axios.post('https://6369798728cd16bba71e5865.mockapi.io/favorites', obj);
    setFavoriteBooks((prev) => ([...prev, obj]));
    console.log('+1');
  };

  return (
    <div>
      <Header pars={(obj) => (setSearchValue(obj))} favoritesValue={favoritesValue} />
      <main>
        <div className='container'>
          <h2>Популярные книги</h2>
          <div className="books">
            {
              books.filter((book) => (book.title.toLowerCase().includes(searchValue.toLowerCase()) || book.author.toLowerCase().includes(searchValue.toLowerCase()))).map((book) => (
                <Book key={book.title} title={book.title} author={book.author} year={book.year} pages={book.pages} price={book.price} cover={book.cover} addFavorite={(obj) => addFavorite(obj)} />
              ))
            }
          </div>
        </div>
      </main>
    </div>
  )
};
 
export default App;

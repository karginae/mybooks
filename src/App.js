import React from 'react';

import Header from './components/Header';
import Book from './components/Book';

function App() {

  const [books, setBooks] = React.useState([]);

  React.useEffect(() => {
    fetch('https://6369798728cd16bba71e5865.mockapi.io/books')
    .then((res) => (res.json()))
    .then((json) => (setBooks(json)));
  }, []);

  return (
    <div>
      <Header />
      <main>
        <div className='container'>
          <h2>Популярные книги</h2>
          <div className="books">
            {
              books.map((obj) => (
                <Book title={obj.title} author={obj.author} year={obj.year} pages={obj.pages} price={obj.price} cover={obj.cover} />
              ))
            }
          </div>
        </div>
      </main>
    </div>
  )
};
 
export default App;

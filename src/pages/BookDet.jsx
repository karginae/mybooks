import React from "react";
import { useParams } from 'react-router-dom';

function BookDet({books, addCart, removeCart, cartBooks}) {
  const params = useParams();

  const getBook = () => (
    books.find((book) => (book.cover === params.id))
  );

  const book = getBook();

  const [add, setAdd] = React.useState(false);

  const clickAddCart = () => {
    add ? removeCart(book.title) : addCart({...book});
    setAdd(!add);
  };

  if (cartBooks.find((cartBook) => (cartBook.title === book.title)) && add === false) {
    setAdd(true);
  };

  return (
    <main>
      <div className='container'>
        <h2>{book.title}</h2>
        <div className="book">
          <img className="bookCover" src={`/img/books/${book.cover}.jpg`} alt="" />
          <ul className="details">
            <li><span>Автор</span><span className="border"></span><span>{book.author}</span></li>
            <li><span>Дата написания</span><span className="border"></span><span>{book.year}</span></li>
            <li><span>Объем</span><span className="border"></span><span>{book.pages}</span></li>
            <li><span>ISBN</span><span className="border"></span><span>{book.ISBN}</span></li>
            <li><span>Возрастное ограничение</span><span className="border"></span><span>{book.age_limit}</span></li>
            <li><span>Жанр</span><span className="border"></span><span>{!book.genre && '-'}</span></li>
            <li><span>Правообладатель</span><span className="border"></span><span>{!book.copyrigh && '-'}</span></li>
          </ul>
          <div className="actions">
            <span>{book.price}</span>
            {/* <Button text={'Добавить в корзину'} src={} width /> */}
            <input className="add" type='submit' value='Добавить в корзину' onClick={() => clickAddCart()} style={add ? {backgroundColor: 'blue'} : {backgroundColor: '#130D3D'}} />
          </div>
        </div>
      </div>
    </main>
  )
};

export default BookDet;
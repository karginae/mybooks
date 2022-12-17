import React from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import axios from '../axios'
import Empty from "../components/Empty";
import { selectorIsAuth } from "../redux/slices/authSlice";

function BookDet({books, addCart, removeCart, cartBooks}) {
  const params = useParams();

  const isAuth = useSelector(selectorIsAuth);

  const getBook = () => (
    books.find((book) => (book._id === params.id))
  );
  
  const book = getBook();

  const [add, setAdd] = React.useState(false);

  const clickAddCart = () => {
    if (isAuth) {
      add ? removeCart(book._id) : addCart({_id: book._id});
      setAdd(!add);
    }
    else {
      alert('Для того чтобы добавить книгу в корзину, необходимо авторизоваться');
    }
  };

  React.useEffect(() => {
    if (isAuth && book && cartBooks.find((cartBook) => (cartBook.book._id === book._id)) && add === false) {
      setAdd(true);
    };
  }, []);

  return (
    <main>
      <div className='container'>
        {!book ? <Empty title={'Ошибка 404'} description={'Страница не найдена'} button={{text: 'Перейти на главную', src: '/'}} /> :
          <>
            <h2>{book.title}</h2>
            <div className="book">
              <img className="bookCover" src={`${axios.getUri()}/covers/${book.cover}`} alt="" />
              <ul className="details">
                <li><span>Автор</span><span className="border"></span><span>{book.author}</span></li>
                <li><span>Дата написания</span><span className="border"></span><span>{book.year}</span></li>
                <li><span>Объем</span><span className="border"></span><span>{book.pages} стр.</span></li>
                <li><span>ISBN</span><span className="border"></span><span>{book.isbn}</span></li>
                <li><span>Возрастное ограничение</span><span className="border"></span><span>{book.age_limit}+</span></li>
                <li><span>Жанр</span><span className="border"></span><span>{book.genre}</span></li>
                <li><span>Правообладатель</span><span className="border"></span><span>{book.copyright}</span></li>
              </ul>
              <div className="actions">
                <span className="price">{book.price} &#8381;</span>
                <input className="addToCart" type='submit' value={add ? 'Товар в корзине' : 'Добавить в корзину'} onClick={() => clickAddCart()} style={add ? {backgroundColor: '#0D3D0F'} : {backgroundColor: '#130D3D'}} />
                <input className="addToFavorites" type='submit' value={add ? 'Товар в избранном' : 'Добавить в избранное'} onClick={() => clickAddCart()} style={add ? {backgroundColor: '#671A0F'} : {backgroundColor: '#671A0F'}} />
              </div>
            </div>
          </>        
        }
      </div>
    </main>
  )
};

export default BookDet;
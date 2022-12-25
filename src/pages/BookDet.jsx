import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';


import axios from '../axios'
import Empty from "../components/Empty";
import { selectorIsAuth } from "../redux/slices/authSlice";
import { fetchRemoveBook } from "../redux/slices/booksSlice";
import { fetchAddCart, fetchRemoveCart } from "../redux/slices/cartSlice";

function BookDet({addCart, removeCart, cartBooks}) {
  const books = useSelector((state) => (state.books.data));
  const params = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isAuth = useSelector(selectorIsAuth);
  const role = useSelector((state) => (state.auth.data?.role?.role));

  const getBook = () => (
    books.find((book) => (book._id === params.id))
  );
  
  const book = getBook();

  const [add, setAdd] = React.useState(false);

  const clickAddCart = () => {
    if (isAuth) {
      // add ? removeCart(book._id) : addCart({_id: book._id});
      add ? dispatch(fetchRemoveCart(book._id)) : dispatch(fetchAddCart({_id: book._id}));
      setAdd(!add);
    }
    else {
      alert('Для того чтобы добавить книгу в корзину, необходимо авторизоваться');
    }
  };

  const deleteBook = async () => {
    try {
      await dispatch(fetchRemoveBook(book._id));
      return window.location.replace('/');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const updateBook = async () => {
    return navigate(`/${book._id}/edit`);
  };

  React.useEffect(() => {
    if (isAuth && book && cartBooks.find((cartBook) => (cartBook.book._id === book._id)) && add === false) {
      setAdd(true);
    };
  }, [cartBooks]);

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
                {role === 'admin' && <><input className="delete" type='submit' value={'Удалить книгу'} onClick={() => deleteBook()} />
                <input className="update" type='submit' value={'Изменить книгу'} onClick={() => updateBook()} /></>}
              </div>
            </div>
          </>        
        }
      </div>
    </main>
  )
};

export default BookDet;
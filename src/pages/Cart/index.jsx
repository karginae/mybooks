import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import axios from '../../axios';
import Empty from '../../components/Empty';

import styles from './Cart.module.scss';

function Cart() {
  const cartBooks = useSelector((state) => state.cart);
  const totalPrice = () =>
    cartBooks.data.reduce((prev, cartBook) => prev + +cartBook.book.price, 0);

  return (
    <main>
      <div className="container">
        <h2>Корзина</h2>
        <div className={styles.cart}>
          {cartBooks.status === 'loading' ||
            (cartBooks.data === null ? (
              <Empty title={'Ошибка загрузки данных'} description={'Что-то пошло не так...'} />
            ) : cartBooks.data.status === 401 ? (
              <Empty
                title={'Корзина пуста'}
                description={'Для добавления товаров в корзину необходимо быть авторизованным'}
                button={{ text: 'Войти/Зарегистрироваться', src: '/auth' }}
              />
            ) : cartBooks.data.length === 0 ? (
              <Empty
                title={'Ваша корзина пуста'}
                description={'Добавьте нужные товары'}
                button={{ text: 'Вернуться в каталог', src: '/' }}
              />
            ) : (
              <>
                <div className={styles.actions}>
                  <div className={styles.total}>
                    <span>Сумма заказа:</span>
                    <span>{totalPrice()} &#8381;</span>
                  </div>
                  <Link to="/order">
                    <div className={styles.toOrder}>К оформлению заказа</div>
                  </Link>
                </div>
                {cartBooks.data.map((cartBook, index) => (
                  <article className={styles.cartItem} key={index}>
                    <div className={styles.cartBook}>
                      <Link to={`/${cartBook.book._id}`}>
                        <img
                          className={styles.bookCover}
                          src={`${axios.getUri()}/covers/${cartBook.book.cover}`}
                          alt="book"
                        />
                      </Link>
                    </div>
                    <ul className={styles.infoBook}>
                      <li className={styles.title}>{cartBook.book.title}</li>
                      <li className={styles.author}>Автор: {cartBook.book.author}</li>
                      <li className={styles.year}>Дата написания: {cartBook.book.year}</li>
                      <li className={styles.pages}>Объем: {cartBook.book.pages} стр.</li>
                      <li className={styles.isbn}>ISBN: {cartBook.book.isbn}</li>
                      <li className={styles.age_limit}>
                        Возрастное ограничение: {cartBook.book.age_limit}+
                      </li>
                    </ul>
                    <div className={styles.price}>{cartBook.book.price} &#8381;</div>
                  </article>
                ))}
              </>
            ))}
        </div>
      </div>
    </main>
  );
}

export default Cart;

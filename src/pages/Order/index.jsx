import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import axios from '../../axios';

import styles from './Order.module.scss';

function Order() {
  const cartBooks = useSelector((state) => state.cart.data);

  const submitOrder = React.useRef(null);
  const [orderStatus, setOrderStatus] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const totalPrice = () => {
    return cartBooks?.reduce((prev, cartBook) => prev + +cartBook.book.price, 0);
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      tel: '+7',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const order = {
        orderBooks: cartBooks?.reduce((prev, cartBook) => [...prev, cartBook.book], []),
        totalPrice: totalPrice(),
        ...values,
      };
      const { data } = await axios.post(`/order`, order);
      if (data.totalPrice) {
        setOrderStatus(true);
      } else {
        setIsLoading(false);
        return data.forEach(({ msg, param }) => setError(param, { message: msg }));
      }
    } catch (error) {
      console.log(error.response.data);
      setOrderStatus(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (orderStatus === true) {
    return <div>Удачно</div>;
  } else if (orderStatus === false) {
    return <div>Неудачно</div>;
  }

  return (
    <main>
      <div className="container">
        <h2>Оформление заказа</h2>
        <div className={styles.order}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ul className={styles.infoUser}>
              <li>
                <span className={styles.fieldName}>Имя</span>
                <input
                  className={errors?.name?.message ? 'input invalid' : 'input'}
                  type="text"
                  placeholder="Имя"
                  {...register('name', { required: 'Укажите имя' })}
                />
                <span className={`${styles.message} errors`}>{errors?.name?.message}</span>
              </li>
              <li>
                <span className={styles.fieldName}>Фамилия</span>
                <input
                  className={errors?.surname?.message ? 'input invalid' : 'input'}
                  type="text"
                  placeholder="Фамилия"
                  {...register('surname', { required: 'Укажите фамилию' })}
                />
                <span className={`${styles.message} errors`}>{errors?.surname?.message}</span>
              </li>
              <li>
                <span className={styles.fieldName}>Номер телефона</span>
                <input
                  className={errors?.tel?.message ? 'input invalid' : 'input'}
                  type="tel"
                  placeholder="+7"
                  {...register('tel', { required: 'Укажите номер телефона' })}
                />
                <span className={`${styles.message} errors`}>{errors?.tel?.message}</span>
              </li>
              <li>
                <span className={styles.fieldName}>Почта</span>
                <input
                  className={errors?.email?.message ? 'input invalid' : 'input'}
                  placeholder="example@mail.ru"
                  type="email"
                  {...register('email', { required: 'Укажите электронную почту' })}
                />
                <span className={`${styles.message} errors`}>{errors?.email?.message}</span>
              </li>
            </ul>
            {/* <div className="errors">
              {Object.keys(errors).map((param) => errors[param].message)}
            </div> */}
            <input type="submit" ref={submitOrder} hidden />
          </form>
          <div className={styles.infoOrder}>
            {cartBooks?.map((cartBook, index) => (
              <article className={styles.book} key={index}>
                <div className={styles.cover}>
                  <Link to={`/${cartBook.book._id}`}>
                    <img
                      className={styles.image}
                      src={`${axios.getUri()}/covers/${cartBook.book.cover}`}
                      alt="book"
                    />
                  </Link>
                </div>
                <ul className={styles.info}>
                  <li className={styles.title}>{cartBook.book.title}</li>
                  <li className={styles.author}>{cartBook.book.author}</li>
                  <li className={styles.price}>{cartBook.book.price} &#8381;</li>
                </ul>
              </article>
            ))}
            <div className={styles.total}>
              <span>Сумма заказа:</span>
              <span>{totalPrice()} &#8381;</span>
            </div>
            <input
              onClick={() => submitOrder.current.click()}
              disabled={!isValid}
              type="submit"
              className={`${styles.toOrder} ${isLoading ? styles.loading : null}`}
              value="Оформить заказ"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Order;

import React from 'react';
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';

import axios from '../../axios';

import styles from './Order.module.scss';

function Order() {
  const cartBooks = useSelector(state => state.cart.data);

  const submitOrder = React.useRef(null);
  const [orderStatus, setOrderStatus] = React.useState(null);

  const totalPrice = () => {
    return cartBooks?.reduce((prev, cartBook) => (prev + +cartBook.book.price), 0);
  };

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      tel: '+7'
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    try {
      const order = {
        orderBooks: (cartBooks?.reduce((prev, cartBook) => [...prev, cartBook.book], [])),
        totalPrice: totalPrice(),
        orderUser: values
      };
      const { data } = await axios.post(`/order`, order);
      if (data.totalPrice) {
        setOrderStatus(true);
      }
      else {
        return data.forEach(({ msg, param }) => setError(param, { message: msg }));
      }
    } catch (error) {
      console.log(error.response.data);
      setOrderStatus(false);
    }
  };

  if (orderStatus === true) {
    return <div>Удачно</div>;
  } else if (orderStatus === false) {
    return <div>Неудачно</div>;
  }

  return (
    <main>
      <div className='container'>
        <h2>Оформление заказа</h2>
        <div className={styles.order}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ul className={styles.infoUser}>
              <li>
                <span>Имя</span>
                <input className="input" type="text" placeholder='Имя' {...register('name', { required: 'Укажите имя' })} />
              </li>
              <li>
                <span>Фамилия</span>
                <input className="input" type="text" placeholder='Фамилия' {...register('surname', { required: 'Укажите фамилию' })} />
              </li>
              <li>
                <span>Номер телефона</span>
                <input className="input" type="tel" placeholder='+7' max={11} {...register('tel', { required: 'Укажите номер телефона' })} />
              </li>
              <li>
                <span>Почта</span>
                <input className="input" placeholder='example@mail.ru' type="email" {...register('email', { required: 'Укажите электронную почту' })} />
              </li>
            </ul>
            <div className='errors'>{errors.server?.message}<br />{errors.name?.message}<br />{errors.surname?.message}<br />{errors.tel?.message}<br />{errors.email?.message}<br />{errors.books?.message}<br />{errors.totalPrice?.message}</div>
            <input type="submit" ref={submitOrder} hidden />
          </form>
          <div className={styles.infoOrder}>
            <div className={styles.total}>
              <span>Сумма заказа:</span><span>{totalPrice()} &#8381;</span>
            </div>
            <input onClick={() => submitOrder.current.click()} disabled={!isValid} type="submit" className={styles.toOrder} value="Оформить заказ" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Order;
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import axios from '../../axios';

import { IOrderData } from '../../pages/Order';
import { totalPrice } from '../../utils/calcTotalPrice';
import styles from './OrderStatus.module.scss';

type OrderStatusProps = {
  status: boolean;
  orderData: IOrderData | null;
};

export const OrderStatus: React.FC<OrderStatusProps> = ({ status, orderData }) => {
  const cartBooks = useSelector((state: RootState) => state.cart.data);

  const parseIdOrder = (id: string) => parseInt(id.slice(-5), 16);

  const order =
    status && orderData
      ? {
          header: 'Заказ оформлен',
          logo: '/img/logo/success.svg',
          info: `Ваш заказ №${parseIdOrder(orderData._id)} успешно оформлен`,
          describe: `Товар отправлен на указанную вами почту ${orderData.email}`,
          link: (
            <Link to="/">
              <span>Перейти в каталог</span>
            </Link>
          ),
        }
      : {
          header: 'Ошибка заказа',
          logo: '/img/logo/error.svg',
          info: 'Ошибка при оформлении заказа',
          describe: 'Проверьте корректность введенных платежных данных',
          link: (
            <a href="/order">
              <span>Повторить попытку</span>
            </a>
          ),
        };

  return (
    <main>
      <div className="container">
        <div className={styles.order}>
          <div className={styles.orderStatus}>
            <h2>
              {order.header} <img src={order.logo} alt="logo" />
            </h2>
            <p>{order.info}</p>
            <p>{order.describe}</p>
            {order.link}
          </div>
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
              <span>{totalPrice(cartBooks)} &#8381;</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

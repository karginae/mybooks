import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import axios from '../../axios';

import styles from './Order.module.scss';
import { OrderStatus } from '../../components/OrderStatus';
import { RootState } from '../../redux/store';
import { BookData } from '../../redux/types/booksType';
import { totalPrice } from '../../utils/calcTotalPrice';

interface IOrder {
  name: string;
  surname: string;
  tel: string;
  email: string;
}

export interface IOrderData extends IOrder {
  _id: string;
  user: string;
  books: BookData[];
  totalPrice: string;
  createdAt: string;
  updateAt: string;
}

const Order: React.FC = () => {
  const cartBooks = useSelector((state: RootState) => state.cart.data);

  const submitOrder = React.useRef<HTMLInputElement>(null);
  const [orderStatus, setOrderStatus] = React.useState<boolean | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [orderData, setOrderData] = React.useState<IOrderData | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<IOrder>({
    defaultValues: {
      tel: '+7',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: IOrder) => {
    setIsLoading(true);
    try {
      const order = {
        orderBooks: cartBooks?.reduce((prev: BookData[], cartBook) => [...prev, cartBook.book], []),
        totalPrice: totalPrice(cartBooks),
        ...values,
      };
      const { data } = await axios.post(`/order`, order);
      if (data.totalPrice) {
        setOrderStatus(true);
        setOrderData(data);
      } else {
        setIsLoading(false);
        setOrderStatus(false);
        return data.forEach(({ msg, param }: { msg: string; param: any }) =>
          setError(param, { message: msg }),
        );
      }
    } catch (error: any) {
      console.log(error.response.data);
      setOrderStatus(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (orderStatus !== null) {
    return <OrderStatus status={orderStatus} orderData={orderData} />;
  } else {
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
              <input className="hidden" type="submit" ref={submitOrder} hidden />
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
                <span>{totalPrice(cartBooks)} &#8381;</span>
              </div>
              <input
                onClick={() => submitOrder.current?.click()}
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
};

export default Order;

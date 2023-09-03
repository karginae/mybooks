import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { Button } from '../components';
import { fetchAuth, logout } from '../redux/slices/authSlice';
import { RootState, useAppDispatch } from '../redux/store';
import { SliceStatus, UserAuth } from '../redux/types/authType';

const Auth: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector((state: RootState) => Boolean(state.auth.data?.email));
  const role = useSelector((state: RootState) => state.auth.data?.role);
  const status = useSelector((state: RootState) => state.auth.status);
  const fullName = useSelector((state: RootState) => state.auth.data?.fullName);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<UserAuth & { server?: string }>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: UserAuth) => {
    try {
      const data: any = await dispatch(fetchAuth(values));
      if (!data.payload.email) {
        return data.payload.forEach(({ msg, param }: { msg: string; param: any }) =>
          setError(param, { message: msg }),
        );
      } else if ('token' in data.payload) {
        window.location.replace('/');
        window.localStorage.setItem('token', data.payload.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onLogout = () => {
    window.location.replace('/');
    window.localStorage.removeItem('token');
    dispatch(logout());
  };

  if (isAuth) {
    return (
      <main>
        <div className="container">
          <h2>{fullName}</h2>
          <div className="personal-area">
            <div className="info">
              <p>Скоро здесь появится информация о ваших заказах &#128221;</p>
            </div>
            <div className="buttons">
              {role === 'admin' ? (
                <Button text="Создать книгу" src="/create-book" width="210px" />
              ) : (
                <Button text="Перейти в корзину" src="/cart" width="210px" />
              )}
              <input
                className="input-logout"
                type="submit"
                onClick={() => onLogout()}
                value="Выйти"
              />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="container">
        <h2>Вход</h2>
        <div className="auth">
          <form onSubmit={handleSubmit(onSubmit)}>
            <ul className="fields">
              <li>
                <span className="fieldName">Почта</span>
                <input
                  className={errors?.email?.message ? 'input invalid' : 'input'}
                  type="email"
                  {...register('email', { required: 'Укажите почту' })}
                />
                <span className={`message errors`}>{errors?.email?.message}</span>
              </li>
              <li>
                <span className="fieldName">Пароль</span>
                <input
                  className={errors?.password?.message ? 'input invalid' : 'input'}
                  type="password"
                  {...register('password', { required: 'Укажите пароль' })}
                />
                <span className={`message errors`}>{errors?.password?.message}</span>
              </li>
            </ul>
            <input
              type="submit"
              disabled={!isValid}
              className={`input-auth ${status === SliceStatus.LOADING ? 'loading' : null}`}
              value="Войти"
            />
            <Button text="Зарегистрироваться" src="/registration" width="210px" />
          </form>
        </div>
      </div>
    </main>
  );
};

export default Auth;

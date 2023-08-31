import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { fetchAuth, logout } from '../redux/slices/authSlice';
import { RootState, useAppDispatch } from '../redux/store';
import { UserAuth } from '../redux/types/authType';

const Auth: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector((state: RootState) => Boolean(state.auth.data?.email));
  const role = useSelector((state: RootState) => state.auth.data?.role);

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
        // document.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onLogout = () => {
    document.location.replace('/');
    window.localStorage.removeItem('token');
    dispatch(logout());
  };

  if (isAuth) {
    return (
      <main>
        <div className="container">
          <div onClick={() => onLogout()}>Выйти</div>
          {role === 'admin' ? (
            <Link to="/create-book">
              <div>Создать книгу</div>
            </Link>
          ) : null}
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
            <div>Ошибки сервера: {errors.server?.message}</div>
            <div>Ошибки почты: {errors.email?.message}</div>
            <div>Ошибка пароля: {errors.password?.message}</div>
            <input
              className="input"
              type="email"
              placeholder="Почта"
              {...register('email', { required: 'Укажите почту' })}
            />
            <input
              className="input"
              type="password"
              placeholder="Пароль"
              {...register('password', { required: 'Укажите пароль' })}
            />
            <input type="submit" disabled={!isValid} />
            <Link to="/registration">
              <div>Зарегистрироваться</div>
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Auth;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { fetchReg } from '../redux/slices/authSlice';
import { RootState, useAppDispatch } from '../redux/store';
import { UserReg } from '../redux/types/authType';

const Registration: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<UserReg & { server?: string }>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const dispatch = useAppDispatch();
  const isAuth = useSelector((state: RootState) => Boolean(state.auth.data?.email));

  const onSubmit = async (values: UserReg) => {
    try {
      const data: any = await dispatch(fetchReg(values));
      if (!data.payload.email) {
        return data.payload.forEach(({ msg, param }: { msg: string; param: any }) =>
          setError(param, { message: msg }),
        );
      } else if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isAuth) {
    return <Navigate to="/auth" />;
  }

  return (
    <main>
      <div className="container">
        <h2>Регистрация</h2>
        <div className="auth">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>Ошибки сервера: {errors.server?.message}</div>
            <div>Ошибки имени: {errors.fullName?.message}</div>
            <div>Ошибки почты: {errors.email?.message}</div>
            <div>Ошибка пароля: {errors.password?.message}</div>
            <input
              className="input"
              type="text"
              placeholder="Имя"
              {...register('fullName', { required: 'Укажите имя' })}
            />
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
          </form>
        </div>
      </div>
    </main>
  );
};

export default Registration;

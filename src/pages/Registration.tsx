import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { fetchReg } from '../redux/slices/authSlice';
import { RootState, useAppDispatch } from '../redux/store';
import { SliceStatus, UserReg } from '../redux/types/authType';

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
  const status = useSelector((state: RootState) => state.auth.status);

  const onSubmit = async (values: UserReg) => {
    try {
      const data: any = await dispatch(fetchReg(values));
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

  if (isAuth) {
    return <Navigate to="/auth" />;
  }

  return (
    <main>
      <div className="container">
        <h2>Регистрация</h2>
        <div className="auth">
          <form onSubmit={handleSubmit(onSubmit)}>
            <ul className="fields">
              <li>
                <span className="fieldName">Имя</span>
                <input
                  className={errors?.fullName?.message ? 'input invalid' : 'input'}
                  type="text"
                  {...register('fullName', { required: 'Укажите имя' })}
                />
                <span className={`message errors`}>{errors?.fullName?.message}</span>
              </li>
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
              className={`input-reg ${status === SliceStatus.LOADING ? 'loading' : null}`}
              value="Зарегестрироваться"
            />
          </form>
        </div>
      </div>
    </main>
  );
};

export default Registration;

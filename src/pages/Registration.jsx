import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { fetchReg } from "../redux/slices/authSlice";

function Registration() {
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => (Boolean(state.auth.data?.email)));

  const onSubmit = async (values) => {
    try {
      const data = await dispatch(fetchReg(values));
      if (!data.payload.email) {
        return data.payload.forEach(({ msg, param }) => setError(param, { message: msg }));
      }
      else if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);
      }
    } catch (error) {
      console.log(error)
    }
  };
  
  if (isAuth) {
    return (<Navigate to='/auth' />);
  }

  return (
    <main>
      <div className='container'>
        <h2>Регистрация</h2>
        <div className="auth">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div htmlFor="">Ошибки сервера: {errors.server?.message}</div>
            <div htmlFor="">Ошибки имени: {errors.fullName?.message}</div>
            <div htmlFor="">Ошибки почты: {errors.email?.message}</div>
            <div htmlFor="">Ошибка пароля: {errors.password?.message}</div>
            <input className="input" type="text" placeholder="Имя" {...register('fullName', { required: 'Укажите имя' })} />
            <input className="input" type="email" placeholder="Почта" {...register('email', { required: 'Укажите почту' })} />
            <input className="input" type="password" placeholder="Пароль" {...register('password', { required: 'Укажите пароль' })} />
            <input type="submit" disabled={!isValid} />
          </form>
        </div>
      </div>
    </main>
  );
};

export default Registration;
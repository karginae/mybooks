import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { fetchAuth, logout } from "../redux/slices/authSlice";

function Auth() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => (Boolean(state.auth.data?.email)));
  const role = useSelector((state) => (state.auth.data?.role?.role));

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    try {
      const data = await dispatch(fetchAuth(values));
      if (!data.payload.email) {
        return data.payload.forEach(({ msg, param }) => setError(param, { message: msg }));
      }
      else if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);
        document.location.reload();
      }
    } catch (error) {
      console.log(error)
    }
  };

  const onLogout = () => {
    document.location.reload();
    window.localStorage.removeItem('token');
    dispatch(logout());
  };

  if (isAuth) {
    return (
      <main>
        <div className="container">
          <div onClick={() => onLogout()}>Выйти</div>
          {role === 'admin' ? <Link to='/create-book'><div>Создать книгу</div></Link> : null}
        </div>
      </main>);
  }

  return (
    <main>
      <div className='container'>
        <h2>Вход</h2>
        <div className="auth">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div htmlFor="">Ошибки сервера: {errors.server?.message}</div>
            <div htmlFor="">Ошибки почты: {errors.email?.message}</div>
            <div htmlFor="">Ошибка пароля: {errors.password?.message}</div>
            <input className="input" type="email" placeholder="Почта" {...register('email', { required: 'Укажите почту' })} />
            <input className="input" type="password" placeholder="Пароль" {...register('password', { required: 'Укажите пароль' })} />
            <input type="submit" disabled={!isValid} />
            <Link to='/registration'><div>Зарегистрироваться</div></Link>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Auth;
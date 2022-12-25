import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import axios from "../axios";
import { fetchAddBook, fetchUpdateBook } from '../redux/slices/booksSlice';
import { add } from '../redux/slices/booksSlice';

function CreateBook() {
  const params = useParams();
  const isEditing = Boolean(params.id);

  // const [imageUrl, setImageUrl] = React.useState('');

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => (state.auth.data?.email));
  const isAuthLoaded = useSelector((state) => (state.auth.status === 'loaded' || null));
  const role = useSelector((state) => (state.auth.data?.role?.role));

  React.useEffect(() => {
    if (params.id) {
      axios.get(`books/${params.id}`).then(({ data }) => {
        setValue('title', data.title);
        setValue('author', data.author);
        setValue('year', data.year);
        setValue('pages', data.pages);
        setValue('price', data.price);
        setValue('cover', data.cover);
        setValue('isbn', data.isbn);
        setValue('age_limit', data.age_limit);
        setValue('genre', data.genre);
        setValue('copyright', data.copyright);
      }).catch((error) => (console.log(error))); 
    }
  }, []);

  const { register, handleSubmit, setError, setValue, formState: { errors, isValid } } = useForm({
    defaultValues: {
      cover: ''
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    try {
      let file;
      let fileExt;
      if (values.cover[0]?.name) {
        file = values.cover[0];
        fileExt = file.name.split('.').pop();
        if (!(fileExt === 'jpg' || fileExt === 'jpeg')) {
          return setError('cover', { message: 'Расширение изображения должно быть в формате JPG (JPEG)' });
        }
        values.cover = `${values.isbn}.${fileExt}`;
      } else {file = false}
      // const res = isEditing ? await axios.patch(`/books/${params.id}`, values) : await dispatch(fetchAddBook(values));
      const res = isEditing ? await dispatch(fetchUpdateBook({ values, id: params.id })) : await dispatch(fetchAddBook(values));
      console.log(res);
      if (res.payload?.title || res.payload?.acknowledged) {
        if (file) {
          const formData = new FormData();
          formData.append('image', file, `${values.isbn}.${fileExt}`);
          try {
            await axios.post('/covers', formData);
          } catch (error) {
            console.log(error);
            return setError('cover', { message: 'Ошибка загрузки обложки' });
          }
        }
        if (isEditing) {
          return window.location.replace(`/${params.id}`);
        } else {
          return navigate(`/${res.payload._id}`);
        }
      }
      else {
        return res.payload.forEach(({ msg, param }) => setError(param, { message: msg }));
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  if (window.localStorage.getItem('token')) {
    if (!isAuth && isAuthLoaded) {
      console.log('Нет доступа');
      return <Navigate to='/' />;
    } else if (role !== 'admin' && isAuthLoaded) {
      console.log('Нет доступа');
      return <Navigate to='/' />;
    }
  } else {
    console.log('Нет доступа');
    return <Navigate to='/' />;
  }

  return (isAuthLoaded &&
    <main>
      <div className='container'>
        <h2>Создание книги</h2>
        <div className="createBook">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <div htmlFor="">Ошибки сервера: {errors.server?.message}</div>
            <div htmlFor="">Ошибки названия: {errors.title?.message}</div>
            <div htmlFor="">Ошибка автора: {errors.author?.message}</div>
            <div htmlFor="">Ошибки даты написания: {errors.year?.message}</div>
            <div htmlFor="">Ошибки объема: {errors.pages?.message}</div>
            <div htmlFor="">Ошибка цены: {errors.price?.message}</div>
            <div htmlFor="">Ошибки обложки: {errors.cover?.message}</div>
            <div htmlFor="">Ошибки ISBN: {errors.isbn?.message}</div>
            <div htmlFor="">Ошибка возрастного лимита: {errors.age_limit?.message}</div>
            <div htmlFor="">Ошибка жанра: {errors.genre?.message}</div>
            <div htmlFor="">Ошибка правообладателя: {errors.copyright?.message}</div> */}
            <input className="input" type="text" placeholder="Название" {...register('title', { required: 'Укажите название' })} />
            <input className="input" type="text" placeholder="Автор" {...register('author', { required: 'Укажите автора' })} />
            <input className="input" type="number" min="1000" max="2100" placeholder="Дата написания" {...register('year', { required: 'Укажите дату написания' })} />
            <input className="input" type="number" placeholder="Объем" {...register('pages', { required: 'Укажите объем' })} />
            <input className="input" type="number" placeholder="Цена" {...register('price', { required: 'Укажите цену' })} />
            <input className="input" type="file" placeholder="Обложка" accept=".jpg,.jpeg" {...register('cover')} />
            <input className="input" type="text" placeholder="ISBN" {...register('isbn', { required: 'Укажите ISBN' })} />
            <input className="input" type="number" placeholder="Возрастное ограничение" {...register('age_limit', { required: 'Укажите возрастное ограничение' })} />
            <input className="input" type="text" placeholder="Жанр" {...register('genre', { required: 'Укажите жанр' })} />
            <input className="input" type="text" placeholder="Правообладатель" {...register('copyright', { required: 'Укажите правообладателя' })} />
            <input type="submit" disabled={!isValid} />
            <div className='errors'>{errors.server?.message}<br />
            {errors.title?.message}<br />
            {errors.author?.message}<br />
            {errors.year?.message}<br />
            {errors.pages?.message}<br />
            {errors.price?.message}<br />
            {errors.cover?.message}<br />
            {errors.isbn?.message}<br />
            {errors.age_limit?.message}<br />
            {errors.genre?.message}<br />
            {errors.copyright?.message}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreateBook;
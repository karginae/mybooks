import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import axios from '../../axios';
import { fetchAddBook, fetchUpdateBook } from '../../redux/slices/booksSlice';

import styles from './CreateBook.module.scss';
import { RootState, useAppDispatch } from '../../redux/store';
import { BookInit } from '../../redux/types/booksType';

const CreateBook: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const params = useParams();

  const dispatch = useAppDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.data?.email);
  const isAuthLoaded = useSelector((state: RootState) => state.auth.status === 'loaded' || null);
  const role = useSelector((state: RootState) => state.auth.data?.role);

  React.useEffect(() => {
    if (params.id) {
      axios
        .get(`books/${params.id}`)
        .then(({ data }) => {
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
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isValid },
  } = useForm<BookInit>({
    defaultValues: {
      cover: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: BookInit) => {
    setIsLoading(true);
    try {
      let file: File | boolean;
      let fileExt;
      const coverFileList = values.cover as FileList;
      if (coverFileList[0].name) {
        file = coverFileList[0];
        fileExt = file.name.split('.').pop();
        if (!(fileExt === 'jpg' || fileExt === 'jpeg')) {
          setIsLoading(false);
          return setError('cover', {
            message: 'Расширение изображения должно быть в формате JPG (JPEG)',
          });
        }
        values.cover = `${values.isbn}.${fileExt}`;
      } else {
        file = false;
      }

      const res: any = params.id
        ? await dispatch(fetchUpdateBook({ values, id: params.id }))
        : await dispatch(fetchAddBook(values));
      console.log(res);

      if (res.payload?.title || res.payload?.acknowledged) {
        if (file) {
          const formData = new FormData();
          formData.append('image', file, `${values.isbn}.${fileExt}`);
          try {
            await axios.post('/covers', formData);
          } catch (error) {
            console.log(error);
            setIsLoading(false);
            return setError('cover', { message: 'Ошибка загрузки обложки' });
          }
        }
        params.id
          ? window.location.replace(`/${params.id}`)
          : window.location.replace(`/${res.payload._id}`);
      } else {
        setIsLoading(false);
        return res.payload.forEach(({ msg, param }: { msg: string; param: any }) =>
          setError(param, { message: msg }),
        );
      }
    } catch (error) {
      console.log(error);
      alert(error);
      setIsLoading(false);
    }
  };

  if (window.localStorage.getItem('token')) {
    if (!isAuth && isAuthLoaded) {
      console.log('Нет доступа');
      return <Navigate to="/" />;
    } else if (role !== 'admin' && isAuthLoaded) {
      console.log('Нет доступа');
      return <Navigate to="/" />;
    }
  } else {
    console.log('Нет доступа');
    return <Navigate to="/" />;
  }

  return (
    isAuthLoaded && (
      <main>
        <div className="container">
          <h2>Создание книги</h2>
          <div>
            <form className={styles.createBook} onSubmit={handleSubmit(onSubmit)}>
              <ul className={styles.fields}>
                <li>
                  <span className={styles.fieldName}>Название</span>
                  <input
                    className={errors?.title?.message ? 'input invalid' : 'input'}
                    type="text"
                    {...register('title', { required: 'Укажите название' })}
                  />
                  <span className={`${styles.message} errors`}>{errors?.title?.message}</span>
                </li>
                <li>
                  <span className={styles.fieldName}>Автор</span>
                  <input
                    className={errors?.author?.message ? 'input invalid' : 'input'}
                    type="text"
                    {...register('author', { required: 'Укажите автора' })}
                  />
                  <span className={`${styles.message} errors`}>{errors?.author?.message}</span>
                </li>
                <li>
                  <span className={styles.fieldName}>Дата написания</span>
                  <input
                    className={errors?.year?.message ? 'input invalid' : 'input'}
                    type="number"
                    min="1000"
                    max="2100"
                    {...register('year', { required: 'Укажите дату написания' })}
                  />
                  <span className={`${styles.message} errors`}>{errors?.year?.message}</span>
                </li>
                <li>
                  <span className={styles.fieldName}>Объем</span>
                  <input
                    className={errors?.pages?.message ? 'input invalid' : 'input'}
                    type="number"
                    {...register('pages', { required: 'Укажите объем' })}
                  />
                  <span className={`${styles.message} errors`}>{errors?.pages?.message}</span>
                </li>
                <li>
                  <span className={styles.fieldName}>Цена</span>
                  <input
                    className={errors?.price?.message ? 'input invalid' : 'input'}
                    type="number"
                    {...register('price', { required: 'Укажите цену' })}
                  />
                  <span className={`${styles.message} errors`}>{errors?.price?.message}</span>
                </li>
                <li>
                  <span className={styles.fieldName}>Обложка</span>
                  <input
                    className={errors?.cover?.message ? 'input invalid' : 'input'}
                    type="file"
                    accept=".jpg,.jpeg"
                    {...register('cover', { required: 'Добавьте обложку' })}
                  />
                  <span className={`${styles.message} errors`}>{errors?.cover?.message}</span>
                </li>
                <li>
                  <span className={styles.fieldName}>ISBN</span>
                  <input
                    className={errors?.isbn?.message ? 'input invalid' : 'input'}
                    type="text"
                    {...register('isbn', { required: 'Укажите ISBN' })}
                  />
                  <span className={`${styles.message} errors`}>{errors?.isbn?.message}</span>
                </li>
                <li>
                  <span className={styles.fieldName}>Возрастное ограничение</span>
                  <input
                    className={errors?.age_limit?.message ? 'input invalid' : 'input'}
                    type="number"
                    {...register('age_limit', { required: 'Укажите возрастное ограничение' })}
                  />
                  <span className={`${styles.message} errors`}>{errors?.age_limit?.message}</span>
                </li>
                <li>
                  <span className={styles.fieldName}>Жанр</span>
                  <input
                    className={errors?.genre?.message ? 'input invalid' : 'input'}
                    type="text"
                    {...register('genre', { required: 'Укажите жанр' })}
                  />
                  <span className={`${styles.message} errors`}>{errors?.genre?.message}</span>
                </li>
                <li>
                  <span className={styles.fieldName}>Правообладатель</span>
                  <input
                    className={errors?.copyright?.message ? 'input invalid' : 'input'}
                    type="text"
                    {...register('copyright', { required: 'Укажите правообладателя' })}
                  />
                  <span className={`${styles.message} errors`}>{errors?.copyright?.message}</span>
                </li>
              </ul>
              <input
                type="submit"
                disabled={!isValid}
                className={`${styles.toSave} ${isLoading ? styles.loading : null}`}
                value="Сохранить"
              />
            </form>
          </div>
        </div>
      </main>
    )
  );
};

export default CreateBook;

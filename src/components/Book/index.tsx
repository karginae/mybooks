import React from 'react';
import ContentLoader from 'react-content-loader';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './Book.module.scss';
import axios from '../../axios';
import { fetchAddFavorite, fetchRemoveFavorite } from '../../redux/slices/favoritesSlice';
import { RootState, useAppDispatch } from '../../redux/store';

type BookProps = {
  _id: string;
  title: string;
  author: string;
  year: string;
  pages: string;
  price: string;
  cover: string | FileList;
};

const Book: React.FC<BookProps> = ({ _id, title, author, year, pages, price, cover }) => {
  const [like, setLike] = React.useState(false);

  const dispatch = useAppDispatch();

  const booksLoaded = useSelector((state: RootState) => state.books.status === 'loaded');
  const isAuth = useSelector((state: RootState) => Boolean(state.auth.data?.email));
  const favorites = useSelector((state: RootState) => state.favorites.data);

  const loading = (
    <ContentLoader
      speed={2}
      width={208}
      height={330}
      viewBox="0 0 208 330"
      backgroundColor="#808599"
      foregroundColor="#8b90a2"
    >
      <rect x="0" y="0" rx="0" ry="0" width="208" height="330" />
    </ContentLoader>
  );

  const clickLike = () => {
    if (isAuth) {
      // like ? removeFavorite(_id) : addFavorite({_id});
      like ? dispatch(fetchRemoveFavorite(_id)) : dispatch(fetchAddFavorite({ _id }));
      setLike(!like);
    } else {
      alert('Для того чтобы добавить книгу в избранные, необходимо авторизоваться');
    }
  };

  React.useEffect(() => {
    if (
      isAuth &&
      favorites?.find((favoriteBook) => favoriteBook.book._id === _id) &&
      like === false
    ) {
      setLike(true);
    }
  }, [favorites]);

  return (
    <article className={styles.book}>
      {!booksLoaded ? (
        loading
      ) : (
        <>
          <div className={styles.infoTop}>
            <span className={styles.price}>{price} &#8381;</span>
            <img
              onClick={() => clickLike()}
              className={styles.like}
              src={like ? '/img/logo/liked.svg' : '/img/logo/like.svg'}
              alt="like"
            />
          </div>
          <div className={styles.infoBottom}>
            <span className={styles.title}>{title}</span>
            <span className={styles.author}>{author}</span>
            <span className={styles.year}>{year}</span>
            <span className={styles.pages}>{pages} стр.</span>
          </div>
          <Link to={`/${_id}`}>
            <img
              className={styles.bookCover}
              src={`${axios.getUri()}/covers/${cover}`}
              alt="book"
            />
          </Link>
        </>
      )}
    </article>
  );
};

export default Book;

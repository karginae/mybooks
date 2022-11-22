import React from 'react';
import ContentLoader from "react-content-loader";
import { Link } from 'react-router-dom';
// import { slugify } from 'transliteration';

import styles from './Book.module.scss';

function Book({id, title, author, year, pages, price, cover, ISBN, age_limit, addFavorite, removeFavorite, favoriteBooks, isLoading}) {
  const [like, setLike] = React.useState(false);

  const loading =
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

  const clickLike = () => {
    like ? removeFavorite(title) : addFavorite({id, title, author, year, pages, price, cover, ISBN, age_limit});
    setLike(!like);
  };
  
  if (favoriteBooks.find((book) => (book.title === title)) && like === false) {
    setLike(true);
  };
  
  return (
    <article className={styles.book}>
      {isLoading ? loading :
      <>
        <div className={styles.infoTop}>
          <span className={styles.price}>{price} &#8381;</span>
          <img onClick={() => clickLike()} className={styles.like} src={like ? "/img/logo/liked.svg" : "/img/logo/like.svg"} alt="like" />
        </div>
        <div className={styles.infoBottom}>
          <span className={styles.title}>{title}</span>
          <span className={styles.author}>{author}</span>
          <span className={styles.year}>{year}</span>
          <span className={styles.pages}>{pages} стр.</span>
        </div>
        <Link to={`/${cover}`}>
          <img className={styles.bookCover} src={`/img/books/${cover}.jpg`} alt="book" />
        </Link>
      </>}
    </article>
  );
};

export default Book
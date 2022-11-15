import React from 'react';

import styles from './Book.module.scss';

function Book({id, title, author, year, pages, price, cover, addFavorite, removeFavorite, favoriteBooks}) {
  const [like, setLike] = React.useState(false);

  const clickLike = () => {
    like ? removeFavorite(title) : addFavorite({id, title, author, year, pages, price, cover});
    setLike(!like);
  };
  
  if (favoriteBooks.find((book) => (book.title === title)) && like === false) {
    setLike(true);
  }
  
  return (
    <article className={styles.book}>
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
      <img className={styles.bookCover} src={`/img/books/${cover}.jpg`} alt="book" />
    </article>
  );
};

export default Book
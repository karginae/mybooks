import React from 'react';

import styles from './Book.module.scss';

function Book(props) {
  const [like, setLike] = React.useState(false);

  const clickLike = () => {
    setLike(!like);
  };

  return (
    <article className={styles.book}>
      <div className={styles.infoTop}>
        <span className={styles.price}>{props.price} &#8381;</span>
        <img onClick={() => clickLike()} className={styles.like} src={like ? "/img/logo/liked.svg" : "/img/logo/like.svg"} alt="like" />
      </div>
      <div className={styles.infoBottom}>
        <span className={styles.title}>{props.title}</span>
        <span className={styles.author}>{props.author}</span>
        <span className={styles.year}>{props.year}</span>
        <span className={styles.pages}>{props.pages} стр.</span>
      </div>
      <img className={styles.bookCover} src={`/img/books/${props.cover}.jpg`} alt="book" />
    </article>
  );
};

export default Book
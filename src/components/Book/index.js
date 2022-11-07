import styles from './Book.module.scss';

function Book(props) {
  return (
    <article className={styles.book}>
      <div className={styles.infoTop}>
        <span className={styles.price}>{props.price} &#8381;</span>
        <img className={styles.like} src="/img/logo/like.svg" alt="like" />
      </div>
      <div className={styles.infoBottom}>
        <span className={styles.title}>{props.title}</span>
        <span className={styles.author}>{props.author}</span>
        <span className={styles.year}>{props.year}</span>
        <span className={styles.pages}>{props.pages} стр.</span>
      </div>
      <img className={styles.bookCover} src={props.cover} alt="book" />
    </article>
  );
};

export default Book
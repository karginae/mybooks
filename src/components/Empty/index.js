import styles from './Empty.module.scss';

import Button from '../Button';

function Empty({title, description, button}) {
  return(
    <div className={styles.empty}>
      <h3 className={styles.title}>{title}</h3>
      {description && <div className={styles.description}>{description}</div>}
      {button && <Button text={button.text} src={button.src} width={button.width} />}
    </div>
  )
};

export default Empty;
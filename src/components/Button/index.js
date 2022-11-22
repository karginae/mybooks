import { Link } from "react-router-dom";

import styles from './Button.module.scss';

function Button({text, src, width}) {
  return(
    <Link to={`${src}`}><input className={styles.button} style={{width: `${width}`}} type="submit" name="go" value={text} src={'/'} /></Link>
  )
};

export default Button;
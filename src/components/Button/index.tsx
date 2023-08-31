import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

export type ButtonProps = {
  text: string;
  src: string;
  width?: string;
};

const Button: React.FC<ButtonProps> = ({ text, src, width }) => {
  return (
    <Link to={`${src}`}>
      <input
        className={styles.button}
        style={width ? { width: `${width}` } : undefined}
        type="submit"
        name="go"
        value={text}
        src={'/'}
      />
    </Link>
  );
};

export default Button;

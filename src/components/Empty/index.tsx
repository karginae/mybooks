import styles from './Empty.module.scss';

import { Button } from '../';

import type { ButtonProps } from '../Button';

type EmptyProps = {
  title: string;
  description?: string;
  button?: ButtonProps;
};

export const Empty: React.FC<EmptyProps> = ({ title, description, button }) => {
  return (
    <div className={styles.empty}>
      <h3 className={styles.title}>{title}</h3>
      {description && <div className={styles.description}>{description}</div>}
      {button && <Button text={button.text} src={button.src} width={button.width} />}
    </div>
  );
};

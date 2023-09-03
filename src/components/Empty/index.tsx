import React from 'react';
import styles from './Empty.module.scss';

type EmptyProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export const Empty: React.FC<EmptyProps> = ({ title, description, children }) => {
  return (
    <div className={styles.empty}>
      <h3 className={styles.title}>{title}</h3>
      {description && <div className={styles.description}>{description}</div>}
      {children}
    </div>
  );
};

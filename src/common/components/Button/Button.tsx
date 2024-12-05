import React from 'react';
import styles from './Button.module.css'; // Предполагается, что у вас есть CSS модуль для стилей
import { FavouriteFilterType } from 'features/Characters/characters.types';
import { ButtonType } from 'common/types/types';

type ButtonProps = {
  type?: ButtonType
  className?: string
  title: string
  currentFilter?: FavouriteFilterType
  filter?: FavouriteFilterType
  onClick?: (filter: any) => void
  isFilterButton?: boolean
};

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  className,
  title,
  currentFilter,
  filter,
  onClick,
  isFilterButton = false,
}) => {
  const handleClick = () => {
    if (onClick && filter !== undefined) {
      onClick(filter);
    }
  };

  const buttonClassName = `${styles.button} ${className} ${
    isFilterButton && currentFilter === filter ? styles.active : ''
  }`;

  return (
    <div className={styles.modalButtonWrapper}>
      <button
        type={type}
        className={buttonClassName}
        onClick={isFilterButton ? handleClick : undefined}
      >
        {title}
      </button>
    </div>
  );
};

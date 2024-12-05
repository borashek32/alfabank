import React from 'react';
import styles from './Search.module.css';
import search from 'common/assets/img/search.svg';

type Props = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};

export const Search = ({
  value,
  onChange
}: Props) => {
  return (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        className={styles.searchInput}
        value={value}
        onChange={onChange}
        placeholder="Search characters..."
      />
      <img src={search} alt='search' className={styles.searchIcon} />
    </div>
  );
};

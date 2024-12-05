import React from 'react';
import styles from './CharacterFeature.module.css';

type CharacterFeatureProps = {
  label: string;
  value: string;
  maxLength?: number;
};

export const CharacterFeature: React.FC<CharacterFeatureProps> = ({
  label,
  value,
  maxLength = 20,
}) => {
  return (
    <div className={styles.textWrapper}>
      <p className={styles.descName}>{label}:</p>
      <p className={styles.descText}>
        {value.length > maxLength ? `${value.substring(0, maxLength - 3)}...` : value}
      </p>
    </div>
  );
};

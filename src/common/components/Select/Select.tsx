import styles from './Select.module.css';

type Props = {
  label: string
  options: { value: string; label: string }[]
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
};

export const Select: React.FC<Props> = ({
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <div className={styles.filterSelectWrapper}>
      <label className={styles.label}>{label}:</label>
      <select className={styles.select} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
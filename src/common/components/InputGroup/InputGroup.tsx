import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './InputGroup.module.css';

type Props = {
  label: string
  register: UseFormRegisterReturn
  error?: string
  type: string
  required?: boolean
  options?: { value: string; label: string }[]
};

export const InputGroup = ({
  label,
  register,
  error,
  type = 'text',
  required = false,
  options,
}: Props) => {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label}>
        {label}{required && <span className={styles.modalRequiredFields}>*</span>}:
      </label>
      {type === 'select' ? (
        <select {...register} className={styles.select}>
          <option value="" disabled>Select {label.toLowerCase()}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea {...register} />
      ) : (
        <input {...register} type={type} />
      )}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

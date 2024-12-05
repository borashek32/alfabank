import { Button } from '../Button/Button';
import styles from './Form.module.css';

type Props = {
  children: React.ReactNode
  formTitle: string
  onSubmit: (e: React.FormEvent) => void
  buttonTitle: string
}

export const Form  = ({
  children,
  formTitle,
  onSubmit,
  buttonTitle,
}: Props) => {

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <h2 className={styles.modalHeader}>{formTitle}</h2>
      {children}
      <p className={styles.modalRequiredText}>
        <span className={styles.modalRequiredFields}>*</span> required fields
      </p>
      <Button 
        type="submit"
        title={buttonTitle}
      />
    </form>
  )
}
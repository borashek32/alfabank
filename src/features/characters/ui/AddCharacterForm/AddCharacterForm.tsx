import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import styles from './AddCharacterForm.module.css';
import { addCharacter, setCharacters } from 'features/Characters/characters.slice';

type Props = {
  onClose: () => void
}

type FormValues = {
  name: string;
  status: string;
  species: string;
  locationName: string;
  locationUrl: string;
  image: string;
  description: string;
};

export const AddCharacterForm = ({ onClose }: Props) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const newCharacter = {
      id: Date.now(),
      name: data.name,
      status: data.status,
      species: data.species,
      location: {
        name: data.locationName,
        url: data.locationUrl,
      },
      image: data.image,
      likes: 0,
      description: data.description,
    };

    console.log(newCharacter)
    dispatch(addCharacter(newCharacter));
    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.modalHeader}>Add Character Form</h2>
      <div className={`${styles.inputWrapper} ${styles.statusWrapper}`}>
        <label className={styles.label}>
          Status<span className={styles.modalRequiredFields}>*</span>:
        </label>
        <select 
          {...register('status', {
            required: 'This field is required'
          })} 
          className={styles.select}
        >
          <option value="" disabled>Select status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
        </select>
        {errors.status && <span className={styles.error}>{errors.status.message}</span>}
      </div>
      <div className={styles.inputWrapper}>
        <label className={styles.label}>
          Name<span className={styles.modalRequiredFields}>*</span>:
        </label>
        <input 
          {...register('name', {
            required: 'This field is required'
          })}
        />
        {errors.name && <span className={styles.error}>{errors.name.message}</span>}
      </div>
      <div className={styles.inputWrapper}>
        <label className={styles.label}>
          Species<span className={styles.modalRequiredFields}>*</span>:
        </label>
        <input 
          {...register('species', {
            required: 'This field is required'
          })} 
        />
        {errors.species && <span className={styles.error}>{errors.species.message}</span>}
      </div>
      <div className={styles.inputWrapper}>
        <label className={styles.label}>
          Location Name<span className={styles.modalRequiredFields}>*</span>:
        </label>
        <input 
          {...register('locationName', {
            required: 'This field is required'
          })} 
        />
        {errors.locationName && <span className={styles.error}>{errors.locationName.message}</span>}
      </div>
      <div className={styles.inputWrapper}>
        <label className={styles.label}>
          Location URL:
        </label>
        <input 
          {...register('locationUrl')}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label className={styles.label}>
          Image URL<span className={styles.modalRequiredFields}>*</span>:
        </label>
        <input 
          {...register('image', {
            required: 'This field is required'
          })}
        />
        {errors.image && <span className={styles.error}>{errors.image.message}</span>}
      </div>
      <div className={styles.inputWrapper}>
        <label className={styles.label}>
          Description<span className={styles.modalRequiredFields}>*</span>:
        </label>
        <textarea 
          {...register('description', {
            required: 'This field is required'
          })}
        />
        {errors.description && <span className={styles.error}>{errors.description.message}</span>}
      </div>
      <p className={styles.modalRequiredText}>
        <span className={styles.modalRequiredFields}>*</span> required fields
      </p>
      <button type="submit" className={styles.modalButton}>Add Character</button>
    </form>
  );
};

import { CharacterType } from './../../api/rickMorty.types';
import styles from './CharacterCard.module.css';

type Props = Pick<CharacterType, "id" | "name" | "image" | "location" | "status" | "species">

export const CharacterCard = ({ 
  id,
  image,
  name,
  location,
  status,
  species,
 }: Props) => {

  return (
    <div className={styles.cardWrapper}>
      <img
        src={image}
        className={styles.cardImage}
        alt="Character"
      />
      {name && 
        <div className={styles.desc}>
          {name && 
            <div className={styles.textWrapper}>
              <p className={styles.descName}>Name:</p>
              <p className={styles.descText}>{name}</p>
            </div>
          }
          {location &&
            <div className={styles.textWrapper}>
              <p className={styles.descName}>Location:</p>
              <p className={styles.descText}>{location.name}</p>
            </div>
          }
          {status && 
            <div className={styles.textWrapper}>
              <p className={styles.descName}>Status:</p>
              <p className={styles.descText}>{status}</p>
            </div>
          }
          {species && 
            <div className={styles.textWrapper}>
              <p className={styles.descName}>Species:</p>
              <p className={styles.descText}>{species}</p>
            </div>
          }
        </div>
      }
    </div>
  )
}
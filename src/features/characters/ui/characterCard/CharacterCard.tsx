import styles from './CharacterCard.module.css';
import likeLight from './../../../../common/assets/img/like-light.svg';
import likeDark from './../../../../common/assets/img/like-dark.svg';
import bin from './../../../../common/assets/img/bin.svg';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { CharacterAppType } from 'features/Characters/characters.types';
import { toggleLike } from 'features/Characters/characters.slice';
import { NavLink } from 'react-router-dom';

type Props = Pick<CharacterAppType, "id" | "name" | "image" | "location" | "status" | "species" | "likes" | "description"> & {
  removeCharacter: (id: number) => void
}

export const CharacterCard = ({ 
  id,
  image,
  name,
  location,
  status,
  species,
  likes,
  description,
  removeCharacter,
 }: Props) => {
  const dispatch = useAppDispatch();

  const removeCharacterHandler = () => {
    removeCharacter(id);
  }

  const toggleLikeHandler = () => {
    dispatch(toggleLike(id));
  }

  return (
    <div className={styles.cardWrapper}>
      <NavLink to={`/character/${id}`} className={styles.cardFlex}>
        <img
          src={image}
          className={styles.cardImage}
          alt="Character"
        />
        <div className={styles.desc}>
          {name && 
            <div className={styles.textWrapper}>
              <p className={styles.descName}>Name:</p>
              <p className={styles.descText}>
              {name.length > 20 ? `${location.name.substring(0, 9)}...` : name}
              </p>
            </div>
          }
          {location &&
            <div className={styles.textWrapper}>
              <p className={styles.descName}>Location:</p>
              <p className={styles.descText}>
                {location.name.length > 10 ? `${location.name.substring(0, 9)}...` : location.name}
              </p>
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
          {description && 
            <div className={styles.textWrapper}>
              <p className={styles.descName}>Description:</p>
              <p className={styles.descText}>{description.substring(0, 15)}...</p>
            </div>
          }
        </div>
      </NavLink>
      <div className={styles.iconsWrapper}>
        <img src={bin} alt="bin" onClick={removeCharacterHandler} />
        {likes
          ? <img src={likeDark} alt='like' onClick={toggleLikeHandler} />
          : <img src={likeLight} alt='like' onClick={toggleLikeHandler} />
        }
      </div>
    </div>
  )
}
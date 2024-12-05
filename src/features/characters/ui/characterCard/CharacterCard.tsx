import styles from './CharacterCard.module.css';
import likeLight from 'common/assets/img/like-light.svg';
import likeDark from 'common/assets/img/like-dark.svg';
import bin from 'common/assets/img/bin.svg';
import edit from 'common/assets/img/edit.svg';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { CharacterAppType } from 'features/Characters/characters.types';
import { toggleLike } from 'features/Characters/characters.slice';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { EditCharacterForm } from '../EditCharacterForm/EditCharacterForm';
import { CharacterFeature } from '../CharacterFeature/CharacterFeature';

type Props = Pick<CharacterAppType, "id" | "name" | "image" | "location" | "status" | "species" | "likes" | "description" | "gender"> & {
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
  gender,
  description,
  removeCharacter,
 }: Props) => {
  const dispatch = useAppDispatch();
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const removeCharacterHandler = () => {
    removeCharacter(id);
  }

  const toggleLikeHandler = () => {
    dispatch(toggleLike(id));
  }

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  }

  return (
    <>
      <div className={styles.cardWrapper}>
        <NavLink to={`/character/${id}`} className={styles.cardFlex}>
          {image 
            ? <img
                src={image}
                className={styles.cardImage}
                alt="Character"
              />
            : (
              <div className={styles.cardImageAltTextWrapper}>
                <p className={styles.cardImageAltText}>Character don't have an image</p>
              </div>
            )
          }
          <div className={styles.desc}>
            {name && <CharacterFeature label="Name" value={name} />}
            {location && <CharacterFeature label="Location" value={location.name} />}
            {status && <CharacterFeature label="Status" value={status} />}
            {species && <CharacterFeature label="Species" value={species} />}
            {gender && <CharacterFeature label="Gender" value={gender} />}
            {description && <CharacterFeature label="Description" value={description} maxLength={15} />}
          </div>
        </NavLink>
        <div className={styles.iconsWrapper}>
          <img src={edit} alt="edit" onClick={handleModalToggle} />
          <img src={bin} alt="bin" onClick={removeCharacterHandler} />
          {likes
            ? <img src={likeDark} alt='like' onClick={toggleLikeHandler} />
            : <img src={likeLight} alt='like' onClick={toggleLikeHandler} />
          }
        </div>
      </div>
      {isModalOpen && (
        <div className={styles.modalBackground}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={handleModalToggle}>
              ×
            </button>
            <EditCharacterForm
              id={id}
              name={name}
              gender={gender}
              location={location}
              status={status}
              species={species}
              description={description}
              image={image}
              onClose={handleModalToggle} />
          </div>
        </div>
      )}
    </>
  )
}
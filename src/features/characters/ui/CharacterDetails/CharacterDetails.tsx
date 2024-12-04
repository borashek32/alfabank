import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { setCharacter } from 'features/Characters/characters.slice';
import { selectCharacterById } from 'features/Characters/characters.selectors';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import styles from './CharacterDetails.module.css';

export const CharacterDetails = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const character = useAppSelector((state) => selectCharacterById(state, Number(id)));

  useEffect(() => {
    if (id) {
      dispatch(setCharacter(+id));
    }
  }, [id, dispatch]);
  
  return (
    <div className={styles.characterWrapper}>
      <NavLink to={'/'}>
        <button className={styles.backButton}>
          ← Back to Characters
        </button>
      </NavLink>
      {character ? (
        <>
          <h1>{character.name}</h1>
          <img src={character.image} alt={character.name} className={styles.image} />
          <p><strong>Location:</strong> {character.location?.name || 'Unknown'}</p>
          <p><strong>Status:</strong> {character.status}</p>
          <p><strong>Species:</strong> {character.species}</p>
          <p><strong>Description:</strong> {character.description || 'No description available'}</p>
          <p><strong>Likes:</strong> {character.likes ? character.likes : 0}</p>
        </>
        ) : (
          <p>Character not found</p> 
        )
      }
    </div>
  );
};

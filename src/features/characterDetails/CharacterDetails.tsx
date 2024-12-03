import { useNavigate, useParams } from 'react-router-dom';
import styles from './CharacterDetails.module.css';
import { useGetCharacterQuery } from 'features/characters/api/rickMorty.api';
import { useEffect } from 'react';
import { setCharacter } from 'features/characters/characters.slice';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectCharacter } from 'features/characters/characters.selector';

export const CharacterDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetCharacterQuery(Number(id));
  const character = useAppSelector(selectCharacter);

  const goBackHandler = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (data) {
      dispatch(setCharacter(data));
    }
  }, [data, dispatch]);
  
  return (
    <div className={styles.characterWrapper}>
      <button onClick={goBackHandler} className={styles.backButton}>
        ← Back to Characters
      </button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Character not found</p>}
      {character ? (
        <>
          <h1>{character.name}</h1>
          <img src={character.image} alt={character.name} className={styles.image} />
          <p><strong>Location:</strong> {character.location?.name || 'Unknown'}</p>
          <p><strong>Status:</strong> {character.status}</p>
          <p><strong>Species:</strong> {character.species}</p>
          <p><strong>Description:</strong> {character.description || 'No description available'}</p>
          <p><strong>Likes:</strong> {character.likes ? 'Yes' : 'No'}</p>
        </>
        ) : (
          <p>Character not found</p> 
        )
      }
    </div>
  );
};

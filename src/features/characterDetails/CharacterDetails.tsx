import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useGetCharacterQuery } from 'features/characters/api/rickMorty.api';
import { setCharacter } from 'features/characters/characters.slice';
import { selectCharacterById } from 'features/characters/characters.selector';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import styles from './CharacterDetails.module.css';

export const CharacterDetails = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  // Попробуем найти персонажа в состоянии Redux
  const character = useAppSelector((state) => selectCharacterById(state, Number(id)));

  // Если персонажа нет в Redux, загружаем его из API
  const { data, isLoading, error } = useGetCharacterQuery(Number(id), {
    skip: !!character, // Пропускаем запрос, если персонаж уже есть
  });

  useEffect(() => {
    if (!character && data) {
      dispatch(setCharacter(data));
    }
  }, [character, data, dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading character</p>;
  
  return (
    <div className={styles.characterWrapper}>
      <NavLink to={'/'}>
        <button className={styles.backButton}>
          ← Back to Characters
        </button>
      </NavLink>
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

import { useEffect, useState } from 'react';
import styles from './CharactersList.module.css';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectCharacters, selectFilter } from 'features/Characters/characters.selectors';
import { useGetCharactersQuery } from 'features/Characters/api/rickMorty.api';
import { removeCharacter, setCharacters, setFilter } from 'features/Characters/characters.slice';
import { CharacterCard } from '../CharacterCard/CharacterCard';
import { AddCharacterForm } from '../AddCharacterForm/AddCharacterForm';

export const CharactersList = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(selectCharacters);
  const filter = useAppSelector(selectFilter);
  const { data } = useGetCharactersQuery(1, {
    skip: characters.length > 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (data) {
      dispatch(setCharacters(data));
    }
  }, [data, dispatch]);

  const removeCharacterHandler = (id: number) => {
    dispatch(removeCharacter(id));
  };

  const handleFilterChange = (filter: 'all' | 'favourites') => {
    dispatch(setFilter(filter));
  };

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <h1>Rick and Morty Characters</h1>
      <div className={styles.buttonsWrapper}>
        <button
          className={`${styles.button} ${filter === 'favourites' ? styles.active : ''}`}
          onClick={() => handleFilterChange('favourites')}
        >
          Favourite Characters
        </button>
        <button
          className={`${styles.button} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          All Characters
        </button>
        <button className={styles.button} onClick={handleModalToggle}>
          Add New Character
        </button>
      </div>
      <div className={styles.charactersWrapper}>
        {characters && characters.map(item => (
          <CharacterCard
            key={item.id}
            id={item.id}
            name={item.name}
            likes={item.likes}
            image={item.image}
            status={item.status}
            species={item.species}
            location={item.location}
            description={item.description}
            removeCharacter={removeCharacterHandler}
          />
        ))}
      </div>
      {isModalOpen && (
        <div className={styles.modalBackground}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={handleModalToggle}>
              ×
            </button>
            <AddCharacterForm 
              onClose={handleModalToggle}
            />
          </div>
        </div>
      )}
    </>
  );
};

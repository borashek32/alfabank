import { useEffect } from 'react';
import { useGetCharactersQuery } from '../api/rickMorty.api';
import styles from './CharactersList.module.css';
import { CharacterCard } from './characterCard/CharacterCard';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { setCharacters, removeCharacter, setFilter } from '../characters.slice';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectCharacters, selectFilter } from '../characters.selector';

export const CharactersList = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(selectCharacters);
  const filter = useAppSelector(selectFilter);

  const removeCharacterHandler = (id: number) => {
    dispatch(removeCharacter(id));
  }

  const { data } = useGetCharactersQuery(1);

  const filteredCharacters =
    filter === 'favourites'
      ? characters.filter((character) => character.likes > 0)
      : characters;

  useEffect(() => {
    if (data) {
      dispatch(setCharacters(data.results))
    }
  }, [dispatch, data])
  
  return (
    <>
      <h1>Rick and Morty characters</h1>
      <div className={styles.buttonsWrapper}>
        <button
          className={`${styles.button} ${filter === 'favourites' ? styles.active : ''}`}
          onClick={() => dispatch(setFilter('favourites'))}
        >
          Favourite Characters
        </button>
        <button
          className={`${styles.button} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => dispatch(setFilter('all'))}
        >
          All Characters
        </button>
      </div>
      <div className={styles.charactersWrapper}>
        {filteredCharacters && filteredCharacters.map(item => {
          return <CharacterCard 
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
        })}
      </div>
    </>
  )
}
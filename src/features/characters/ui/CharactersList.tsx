import { useEffect } from 'react';
import { useGetCharactersQuery } from '../api/rickMorty.api';
import styles from './CharactersList.module.css';
import { CharacterCard } from './characterCard/CharacterCard';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { setCharacters, removeCharacter, setFilter } from '../characters.slice';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectCharacters, selectFilter } from '../characters.selector';

export const CharactersList = () => {
  console.log('render');
  const dispatch = useAppDispatch();
  const characters = useAppSelector(selectCharacters); // Отображаемые персонажи
  const filter = useAppSelector(selectFilter); // Текущий фильтр
  const { data } = useGetCharactersQuery(1, {
    skip: characters.length > 0, // Не делаем запрос, если данные уже есть
  });

  // Инициализируем список персонажей только при первой загрузке данных
  useEffect(() => {
    if (data) {
      dispatch(setCharacters(data.results)); // Записываем данные из API только один раз
    }
  }, [data, dispatch]);

  const removeCharacterHandler = (id: number) => {
    dispatch(removeCharacter(id));
  };

  const handleFilterChange = (filter: 'all' | 'favourites') => {
    dispatch(setFilter(filter)); // Устанавливаем фильтр
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
    </>
  );
};

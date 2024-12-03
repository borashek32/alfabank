import { useGetCharactersQuery } from '../api/rickMorty.api';
import styles from './Characters.module.css';
import { CharacterCard } from './characterCard/CharacterCard';

export const Characters = () => {
  const { 
    data,
  } = useGetCharactersQuery(1);
  
  return (
    <div className={styles.catalogWrapper}>
      <h1>Rick and Morty characters</h1>
      <div className={styles.catalog}>
        {data && data.results.map(item => {
          return <CharacterCard 
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              status={item.status}
              species={item.species}
              location={item.location}
            />
        })}
      </div>
    </div>
  )
}
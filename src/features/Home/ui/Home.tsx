import { NavLink } from 'react-router-dom';
import styles from './Home.module.css';
import { Button } from 'common/components/Button/Button';
import { PATHS } from 'common/constants/paths';

export const Home = () => {

  return (
    <div className={styles.wrapper}>
      <h1>Rick and Morty Api</h1>
      <NavLink to={PATHS.CHARACTERS_LIST}>
        <Button 
          title='Go'
        />
      </NavLink>
    </div>
  )
}
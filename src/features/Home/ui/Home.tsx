import { NavLink } from 'react-router-dom';
import styles from './Home.module.css';
import { Button } from 'common/components/Button/Button';

export const Home = () => {

  return (
    <div className={styles.wrapper}>
      <h1>Rick and Morty Api</h1>
      <NavLink to='/characters'>
        <Button 
          title='Go'
        />
      </NavLink>
    </div>
  )
}
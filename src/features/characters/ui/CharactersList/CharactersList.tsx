import { useEffect, useState } from 'react';
import styles from './CharactersList.module.css';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectCharacters, selectFilter, selectStatusFilter, selectGenderFilter, selectSpeciesFilter, selectSearchQuery } from 'features/Characters/characters.selectors';
import { removeCharacter, setCharacters, setFilter, setStatusFilter, setGenderFilter, setSpeciesFilter, setSearchQuery } from 'features/Characters/characters.slice';
import { CharacterCard } from '../CharacterCard/CharacterCard';
import { AddCharacterForm } from '../AddCharacterForm/AddCharacterForm';
import { useGetCharactersQuery } from 'features/Characters/api/rickMorty.api';
import { Button } from 'common/components/Button/Button';
import add from 'common/assets/img/add.svg';
import { Pagination } from 'common/components/Pagination/Pagination';
import { FavouriteFilterType, StatusFilterType, SpeciesFilterType, GenderFilterType } from 'features/Characters/characters.types';
import { Select } from 'common/components/Select/Select';
import { statusOptions, speciesOptions, genderOptions } from 'common/constants/constants';
import { Search } from 'common/components/Search/Search';

export const CharactersList = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(selectCharacters);
  const currentFilter = useAppSelector(selectFilter);
  const currentStatusFilter = useAppSelector(selectStatusFilter);
  const currentGenderFilter = useAppSelector(selectGenderFilter);
  const currentSpeciesFilter = useAppSelector(selectSpeciesFilter);
  const currentSearchQuery = useAppSelector(selectSearchQuery);

  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = Number(process.env.ITEMS_PER_PAGE) || 5;

  // get the first 20 characters and use them as a full list of characters
  // cuz it depends on api - it gives us characters only by page
  const { data, isLoading, isFetching } = useGetCharactersQuery(1, {
    skip: characters.length > 0,
  });

  useEffect(() => {
    if (data) {
      dispatch(setCharacters(data));
    }
  }, [data, dispatch]);

  const removeCharacterHandler = (id: number) => {
    dispatch(removeCharacter(id));
  };

  const handleFilterChange = (filter: FavouriteFilterType) => {
    dispatch(setFilter(filter));
  };

  const handleStatusFilterChange = (filter: StatusFilterType) => {
    dispatch(setStatusFilter(filter));
  };

  const handleGenderFilterChange = (filter: GenderFilterType) => {
    dispatch(setGenderFilter(filter));
  };

  const handleSpeciesFilterChange = (filter: SpeciesFilterType) => {
    dispatch(setSpeciesFilter(filter));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  const paginatedCharacters = characters.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        <div className={styles.headerWrapper}>
          <h1>Rick and Morty Characters</h1>
          <div className={styles.buttonsWrapper}>
            <Button
              currentFilter={currentFilter}
              filter="favourites"
              onClick={handleFilterChange}
              isFilterButton
              title="Favourite Characters"
            />
            <Button
              currentFilter={currentFilter}
              filter="all"
              onClick={handleFilterChange}
              isFilterButton
              title="All Characters"
            />
          </div>
          <div className={styles.addWrapper} onClick={handleModalToggle}>
            <img src={add} alt='add' />
            <p>Add a new character</p>
          </div>
          <div className={styles.filtersWrapper}>
            <Select
              label="Status"
              options={[{ value: '', label: 'All Statuses' }, ...statusOptions]}
              value={currentStatusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value as StatusFilterType)}
            />
            <Select
              label="Gender"
              options={[{ value: '', label: 'All Genders' }, ...genderOptions]}
              value={currentGenderFilter}
              onChange={(e) => handleGenderFilterChange(e.target.value as GenderFilterType)}
            />
            <Select
              label="Species"
              options={[{ value: '', label: 'All Species' }, ...speciesOptions]}
              value={currentSpeciesFilter}
              onChange={(e) => handleSpeciesFilterChange(e.target.value as SpeciesFilterType)}
            />
          </div>
          <div className={styles.searchWrapper}>
            <Search
              value={currentSearchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className={styles.charactersWrapper}>
          {isLoading || isFetching ? (
            <p>Loading...</p>
          ) : (
            paginatedCharacters.map((item) => (
              <CharacterCard
                key={item.id}
                id={item.id}
                name={item.name}
                likes={item.likes}
                image={item.image}
                gender={item.gender}
                status={item.status}
                species={item.species}
                location={item.location}
                description={item.description}
                removeCharacter={removeCharacterHandler}
              />
            ))
          )}
        </div>
        {isModalOpen && (
          <div className={styles.modalBackground}>
            <div className={styles.modalContent}>
              <button className={styles.closeButton} onClick={handleModalToggle}>
                ×
              </button>
              <AddCharacterForm onClose={handleModalToggle} />
            </div>
          </div>
        )}
        <Pagination
          page={page}
          setPage={setPage}
          charactersLength={characters.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};

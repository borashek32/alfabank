import { store } from 'common/providers/model/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CharacterDetails } from 'features/Characters/ui/CharacterDetails/CharacterDetails';
import { CharactersList } from 'features/Characters/ui/CharactersList/CharactersList';
import { Home } from 'features/Home/ui/Home';
import { PATHS } from 'common/constants/paths';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path={PATHS.HOME} element={<Home />} />
          <Route path={PATHS.CHARACTERS_LIST} element={<CharactersList />} />
          <Route path={`${PATHS.CHARACTERS_LIST}/:id`} element={<CharacterDetails />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

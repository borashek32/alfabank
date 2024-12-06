import { store } from 'common/providers/model/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CharacterDetails } from 'features/Characters/ui/CharacterDetails/CharacterDetails';
import { CharactersList } from 'features/Characters/ui/CharactersList/CharactersList';
import { Home } from 'features/Home/ui/Home';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<CharactersList />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

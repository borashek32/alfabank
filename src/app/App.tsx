import { store } from '../common/providers/model/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './../common/assets/styles/App.css';
import { Provider } from 'react-redux';
import { CharacterDetails } from 'features/Characters/ui/CharacterDetails/CharacterDetails';
import { CharactersList } from 'features/Characters/ui/CharactersList/CharactersList';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<CharactersList />} />
            <Route path="/character/:id" element={<CharacterDetails />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;

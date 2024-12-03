import { store } from '../common/providers/model/store';
import { Characters } from '../features/characters/ui/Characters';
import './../common/assets/styles/App.css';
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Characters />
      </Provider>
    </div>
  );
}

export default App;

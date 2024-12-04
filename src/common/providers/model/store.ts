import { charactersReducer } from 'features/Characters/characters.slice';
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rickMortyApi } from 'features/Characters/api/rickMorty.api';
 
export const store = configureStore({
  reducer: {
    [rickMortyApi.reducerPath]: rickMortyApi.reducer,
    characters: charactersReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
    rickMortyApi.middleware,
  ),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
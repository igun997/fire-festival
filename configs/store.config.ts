import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import slicer from '../redux/slices';
import persist from '../redux/persists';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'setting'],
};
const reducers = combineReducers({
  ...persist,
  ...slicer,
});
const persistedReducer = persistReducer(persistConfig, reducers);
export const storeConfig = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export type AppDispatch = typeof storeConfig.dispatch;
export type RootState = ReturnType<typeof storeConfig.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

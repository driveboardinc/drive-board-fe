import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import paginationReducer from '@/feature/slice/paginationSlice';
import { combineReducers } from 'redux';
import { apiSlice } from '@/app/api/apiSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [''],
};

const rootReducer = combineReducers({
  // auth: authReducer,
  pageDetails: paginationReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
        ],

        ignoredPaths: ['persist.purged'],
      },
    }).concat(apiSlice.middleware),
  devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

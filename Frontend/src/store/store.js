import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import contactReducer from './contactSlice';
import chatReducer from './chatSlice';
import messageReducer from './messageSlice';
import alertReducer from './alertSlice';

import storage from 'redux-persist/lib/storage';

import {
    persistReducer,
    persistStore
} from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,

    whitelist: [
        'auth',
        'contacts',
        'chat'
    ]
};

const rootReducer = combineReducers({

    auth: authReducer,
    contacts: contactReducer,
    chat: chatReducer,
    messages: messageReducer,
    alert: alertReducer
});

const persistedReducer =
    persistReducer(
        persistConfig,
        rootReducer
    );

export const store =
    configureStore({

        reducer: persistedReducer,

        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false
            })

    });

export const persistor =
    persistStore(store);
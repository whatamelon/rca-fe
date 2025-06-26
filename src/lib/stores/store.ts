/* eslint-disable object-curly-newline */
import type { Action, Middleware, ThunkAction } from '@reduxjs/toolkit'
import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import { PersistPartial } from 'redux-persist/lib/persistReducer'
import storage from 'redux-persist/lib/storage'

import { authApiSlice } from './service/authApiSlice'
import { componentApiSlice } from './service/componentSlice'
import { contentApiSlice } from './service/contentSlice'
import { filterApiSlice } from './service/filterApiSlice'
import { authSlice } from './slice/authSlice'

import { userSessionMiddleware } from './userSessionMiddleware'
import { appSlice } from './slice/appSlice'
// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
// Infer the `RootState` type from the root reducer

const rootReducer = combineSlices(appSlice, authSlice, authApiSlice, contentApiSlice, componentApiSlice, filterApiSlice)

const persistConfig = {
  key: 'root',
  version: 1,
  storage, // localStorage를 사용하겠다는 의미
  whitelist: [authSlice.reducerPath, appSlice.reducerPath], // 해당 slice만 localStorage에 저장하겠다는 의미
  timeout: 1000, // @link https://github.com/rt2zz/redux-persist/issues/816
}
export type RootState = ReturnType<typeof rootReducer> & PersistPartial
// redux-persist를 사용하기 위해 persistConfig를 만들어서 persistReducer로 rootReducer를 감싸줌.
const persistedReducer = persistReducer(persistConfig, rootReducer)

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    // getDefaultMiddleware 메서드를 호출해서 반환된 미들웨어 배열의 끝에 추가함.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
      }).concat(
        userSessionMiddleware,
        filterApiSlice.middleware as unknown as Middleware<unknown, RootState>,
        authApiSlice.middleware as unknown as Middleware<unknown, RootState>,
        contentApiSlice.middleware as unknown as Middleware<unknown, RootState>,
        componentApiSlice.middleware as unknown as Middleware<unknown, RootState>,
      ),
  })

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch']

export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>

// refetchOnMount 나 refetchOnReconnect 일때 실행됨.
setupListeners(makeStore)

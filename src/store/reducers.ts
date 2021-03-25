/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit'

import { InjectedReducersType } from 'utils/types/injector-typings'

function createInjectedReducer(injectedReducers: InjectedReducersType = {}) {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error
  if (Object.keys(injectedReducers).length === 0) {
    return state => state
  } else {
    return combineReducers({
      ...injectedReducers,
    })
  }
}

const createResettableRootReducer = rootReducer => (state, action) => {
  if (action.type === 'store/reset') {
    return rootReducer(undefined, action)
  }
  return rootReducer(state, action)
}

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  const rootReducer = createInjectedReducer(injectedReducers)
  const resettableRootReducer = createResettableRootReducer(rootReducer)
  return resettableRootReducer
}

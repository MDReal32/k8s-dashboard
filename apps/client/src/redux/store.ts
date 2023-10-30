import { useDispatch as _useDispatch, useSelector as _useSelector } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import { apiReducers, apis } from "./api/resources";

export const store = configureStore({
  reducer: { ...apiReducers },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(Object.values(apis).map(reducer => reducer.middleware))
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) => _useSelector<RootState, TSelected>(selector, equalityFn);
export const useDispatch = () => _useDispatch<typeof store.dispatch>();

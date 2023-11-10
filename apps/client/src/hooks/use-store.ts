import {
  TypedUseSelectorHook,
  useDispatch as _useDispatch,
  useSelector as _useSelector
} from "react-redux";

import type { AppDispatch, RootState } from "../redux/store";

export const useDispatch: () => AppDispatch = _useDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;

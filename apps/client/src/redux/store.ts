import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import { resourcesApi } from "./api";
import { rootReducer } from "./root-reducer";

export const store = configureStore({
  reducer: {
    ...rootReducer,
    [resourcesApi.reducerPath]: resourcesApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(resourcesApi.middleware)
});

setupListeners(store.dispatch);

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import { projectApi } from "./reducer/api/project";
import { resourceApiMiddlewares, resourceApiReducers } from "./reducer/api/resources";
import { navbar } from "./reducer/layout/navbar";
import { graph } from "./reducer/pages/graph";

export const store = configureStore({
  reducer: combineReducers({
    ...resourceApiReducers,
    [projectApi.reducerPath]: projectApi.reducer,
    layout: combineReducers({ navbar }),
    pages: combineReducers({ graph })
  }),
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    ...resourceApiMiddlewares,
    projectApi.middleware
  ]
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { pathMap, router } from "../../../routes";

export const graphSlice = createSlice({
  name: "pages.graph",
  initialState: { namespace: "*", mode: "2d" },
  reducers: {
    setNamespace(state, action: PayloadAction<string>) {
      state.namespace = action.payload;
      router.navigate(pathMap.GRAPH_NAMESPACE({ namespace: state.namespace }));
    },
    setMode(state, action: PayloadAction<"2d" | "3d">) {
      state.mode = action.payload;
    }
  }
});

export const {
  reducer: graph,
  actions: { setNamespace, setMode }
} = graphSlice;

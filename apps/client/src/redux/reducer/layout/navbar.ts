import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
  name: "layout.navbar",
  initialState: {
    sidebar: { isOpen: false },
    values: {
      brandWidth: 0,
      clientRoutingElementsWidth: 0,
      getStartedWidth: 0
    }
  },
  reducers: {
    setBrandWidth(state, action: PayloadAction<number>) {
      state.values.brandWidth = action.payload;
    },
    setClientRoutingElementsWidth(state, action: PayloadAction<number>) {
      state.values.clientRoutingElementsWidth = action.payload;
    },
    setGetStartedWidth(state, action: PayloadAction<number>) {
      state.values.getStartedWidth = action.payload;
    },
    setIsSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebar.isOpen = action.payload;
    }
  }
});

export const {
  reducer: navbar,
  actions: { setBrandWidth, setIsSidebarOpen, setGetStartedWidth, setClientRoutingElementsWidth }
} = navbarSlice;

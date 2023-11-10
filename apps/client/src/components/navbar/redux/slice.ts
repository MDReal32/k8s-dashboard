import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    sidebar: { isOpen: false },
    animation: { isAnimating: false },
    values: {
      brandWidth: 0,
      clientRoutingElementsWidth: 0,
      getStartedWidth: 0
    }
  },
  reducers: {
    setBrandWidth(state, action: PayloadAction<number>) {
      if (state.animation.isAnimating) return;
      state.values.brandWidth = action.payload;
    },
    setClientRoutingElementsWidth(state, action: PayloadAction<number>) {
      if (state.animation.isAnimating) return;
      state.values.clientRoutingElementsWidth = action.payload;
    },
    setGetStartedWidth(state, action: PayloadAction<number>) {
      if (state.animation.isAnimating) return;
      state.values.getStartedWidth = action.payload;
    },
    setIsSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebar.isOpen = action.payload;
    },
    setIsAnimating(state, action: PayloadAction<boolean>) {
      state.animation.isAnimating = action.payload;
    }
  }
});

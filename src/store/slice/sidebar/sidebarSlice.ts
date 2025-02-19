import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SidebarSettings = {
  disabled: boolean;
  isHoverOpen: boolean;
};

interface SidebarState {
  isOpen: boolean;
  isHover: boolean;
  settings: SidebarSettings;
}

const initialState: SidebarState = {
  isOpen: true,
  isHover: false,
  settings: { disabled: false, isHoverOpen: false },
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setIsHover: (state, action: PayloadAction<boolean>) => {
      state.isHover = action.payload;
    },
    setSettings: (state, action: PayloadAction<Partial<SidebarSettings>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },
  },
});

export const { toggleOpen, setIsOpen, setIsHover, setSettings } =
  sidebarSlice.actions;

// Selector for getting the open state
export const selectSidebarOpenState = (state: { sidebar: SidebarState }) =>
  state?.sidebar?.isOpen ||
  (state?.sidebar?.settings?.isHoverOpen && state?.sidebar?.isHover) ||
  false;

// selector for gettint the settings if disabled
export const selectSidebarSettings = (state: { sidebar: SidebarState }) =>
  state?.sidebar?.settings;

export default sidebarSlice.reducer;

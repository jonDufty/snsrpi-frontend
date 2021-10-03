import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  hasErrors: false,
  devices: [],
  selected: null,
  openKeys: [],
};

const API_URL = process.env.REACT_APP_BACKEND_URL;

// A slice for posts with our three reducers
const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    getDevices: (state) => {
      state.loading = true;
      state.selected = null;
    },
    getDevicesSuccess: (state, { payload }) => {
      state.devices = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getDevicesFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
      state.selected = null;
    },
    selectDevice: (state, { payload }) => {
      state.selected = payload;
    },
    updateOpenMenus: (state, { payload }) => {
      state.openKeys = payload;
    },
  },
});

// Three actions generated from the slice
export const {
  getDevices,
  getDevicesSuccess,
  getDevicesFailure,
  selectDevice,
  updateOpenMenus,
} = devicesSlice.actions;

// A selector
export const devicesSelector = (state) => state.devices;

// The reducer
export default devicesSlice.reducer;

// Asynchronous thunk action
export function fetchDevices() {
  return async (dispatch) => {
    dispatch(getDevices());

    try {
      console.log(`fetching data from ${API_URL}/api/devices`);

      const response = await fetch(`${API_URL}/api/devices`);
      const data = await response.json();
      dispatch(getDevicesSuccess(data));
    } catch (error) {
      dispatch(getDevicesFailure());
    }
  };
}

import { createSlice } from "@reduxjs/toolkit";
import { getSortByList } from "components/Discover/utils";
import _find from "lodash/find";

const sortLists = getSortByList();

const initialState = {
  filters: {
    sort_by: _find(sortLists, { default: true }).code,
  },
};

export const discoverSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      state.filters[action?.payload?.key] = action.payload?.value;
    },
    resetFilters: (state, action) => {
      if (action?.payload?.key)
        state.filters[action?.payload?.key] = action.payload?.value;
      else state.filters = {};
    },
  },
});

export const { updateFilters, resetFilters } = discoverSlice.actions;

export const getFilters = (state) => state.discover.filters;

export default discoverSlice.reducer;

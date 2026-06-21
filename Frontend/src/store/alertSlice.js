import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    message: '',
    type: 'info'
};

const alertSlice = createSlice({
    name: 'alert',

    initialState,

    reducers: {

        showAlert: (state, action) => {

            state.isOpen = true;

            state.message = action.payload.message;

            state.type = action.payload.type || 'info';
        },

        hideAlert: (state) => {

            state.isOpen = false;

            state.message = '';

            state.type = 'info';
        }

    }
});

export const {
    showAlert,
    hideAlert
} = alertSlice.actions;

export default alertSlice.reducer;
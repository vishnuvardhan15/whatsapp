import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    contacts: []
};

const contactSlice = createSlice({
    name: 'contacts',
    initialState,

    reducers: {

        setContacts: (state, action) => {
            state.contacts = action.payload;
        },

        addContact: (state, action) => {
            state.contacts.push(action.payload);
        },

        clearContacts: (state) => {
            state.contacts = [];
        }

    }
});

export const {
    setContacts,
    addContact,
    clearContacts
} = contactSlice.actions;

export default contactSlice.reducer;
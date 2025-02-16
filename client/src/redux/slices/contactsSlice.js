// client/src/redux/slices/contactsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

// Async thunks for contact operations
export const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/contacts');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addContact = createAsyncThunk(
    'contacts/addContact',
    async (contactData, { rejectWithValue }) => {
        try {
            const response = await api.post('/contacts', contactData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateContact = createAsyncThunk(
    'contacts/updateContact',
    async ({ id, contactData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/contacts/${id}`, contactData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/contacts/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const searchContacts = createAsyncThunk(
    'contacts/searchContacts',
    async (searchTerm, { rejectWithValue }) => {
        try {
            const response = await api.get(`/contacts/search?q=${searchTerm}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: [],
        loading: false,
        error: null,
        currentContact: null,
    },
    reducers: {
        setCurrentContact: (state, action) => {
            state.currentContact = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Contacts
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts = action.payload;
                state.error = null;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add Contact
            .addCase(addContact.pending, (state) => {
                state.loading = true;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts.push(action.payload);
                state.error = null;
            })
            .addCase(addContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Contact
            .addCase(updateContact.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateContact.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.contacts.findIndex(contact => contact._id === action.payload._id);
                if (index !== -1) {
                    state.contacts[index] = action.payload;
                }
                state.error = null;
            })
            .addCase(updateContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete Contact
            .addCase(deleteContact.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts = state.contacts.filter(contact => contact._id !== action.payload);
                state.error = null;
            })
            .addCase(deleteContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Search Contacts
            .addCase(searchContacts.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts = action.payload;
                state.error = null;
            })
            .addCase(searchContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setCurrentContact, clearError } = contactsSlice.actions;
export default contactsSlice.reducer;

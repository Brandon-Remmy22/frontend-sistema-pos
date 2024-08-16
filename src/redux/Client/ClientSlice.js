import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getClients, getClient } from "../../services/client/clientService";

export const getClientsFetch = createAsyncThunk(
    "/get-all-clients", async () => {
        const response = await getClients();
        return response;
    }
)

export const getClientFetch = createAsyncThunk(
    "/get-one-client", async (alrticleId) => {
        const response = await getClient(alrticleId);
        return response;
    }
)

export const clientSlice = createSlice({
    name: 'clients',
    initialState: {
        clients: [],
        client: {
        },
        status: 'idle',
        error: null,
        clientStatus: 'idle',
        articleError: null,
    },
    reducers: {
        updateClients: (state, action) => {
            state.clients = action.payload;
        },
        clearClient: (state) => {
            state.client = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getClientsFetch.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getClientsFetch.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.clients = action.payload.clientes;
            })
            .addCase(getClientsFetch.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(getClientFetch.pending, (state) => {
                state.clientStatus = "loading";
            })
            .addCase(getClientFetch.fulfilled, (state, action) => {
                state.clientStatus = "succeeded";
                state.client = action.payload;
            })
            .addCase(getClientFetch.rejected, (state, action) => {
                state.clientStatus = "failed";
                state.clientError = action.error.message;
            });
    }
});
export const { updateClients, clearClient } = clientSlice.actions;

export const selectClients = (state) => state.client?.clients;
export const selectClient = (state) => state.client?.client;

export default clientSlice.reducer;
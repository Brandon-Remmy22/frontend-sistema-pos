import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, getUser } from "../../services/user/userService";


export const getUsersFetch = createAsyncThunk(
  "/get-all-users", async () => {
    const response = await getUsers();
    return response;
  }
)

export const getUserFetch = createAsyncThunk(
  "/get-one-user", async (userId) => {
    const response = await getUser(userId);
    return response;
  }
)

// Creamos un slice de redux para los usuarios
const userSlice = createSlice({
  // Le damos un nombre al slice
  name: "users",
  // Definimos el estado inicial
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Otros reducers si los necesitas
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsersFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload.usuarios;
      })
      .addCase(getUsersFetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  }
});

// Exportamos un selector para obtener los usuarios del estado
export const selectUsers = (state) => state.user?.users;

// Exportamos el reducer por defecto del slice
export default userSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

});

// Exportamos un selector para obtener los usuarios del estado
export const selectUsers = (state) => state.user?.users;

// Exportamos el reducer por defecto del slice
export default userSlice.reducer;

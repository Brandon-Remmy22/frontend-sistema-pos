import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSales, getSale } from "../../services/sale/saleService";

export const getSalesFetch = createAsyncThunk(
    "/get-all-sales", async () => {
        const response = await getSales();
        return response;
    }
)

export const getSaleFetch = createAsyncThunk(
    "/get-one-sale", async (id) => {
        const response = await getSale(id);
        return response;
    }
)

export const saleSlice = createSlice({
    name: 'sales',
    initialState: {
        sales: [],
        salesReport: [],
        salesShooppingCart: [],
        sale: {
        },
        status: 'idle',
        error: null,
        saleStatus: 'idle',
        saleError: null,
    },
    reducers: {
        updateSales: (state, action) => {
            const index = state.salesShooppingCart.findIndex(sale => sale.id === action.payload.id);
            if (index !== -1) {
                console.log("action", action.payload);
                state.salesShooppingCart[index] = { ...action.payload, cantidad: parseFloat(action.payload.cantidad), precio: parseFloat(action.payload.precio), importe: parseFloat(action.payload.precio) * parseFloat(action.payload.cantidad) };
            }
        },
        clearSale: (state) => {
            state.sale = {};
        },
        updateSalesFilter: (state, action) => {
            state.salesReport = action.payload;
        },
        addSale: (state, action) => {
            const index = state.salesShooppingCart.findIndex(sale => sale.id === action.payload.id);
            if (index !== -1) {
                //  console.log(state.salesShooppingCart[index].cantidad + 1, action.payload.stock)
                if (state.salesShooppingCart[index].cantidad + 1 <= parseInt(action.payload.stock)) {
                    state.salesShooppingCart[index].cantidad = parseFloat(state.salesShooppingCart[index].cantidad) + 1;
                    state.salesShooppingCart[index].importe = parseFloat(state.salesShooppingCart[index].cantidad) * parseFloat(state.salesShooppingCart[index].precio);
                } else {
                    console.log("fuera del stock");
                }
            } else {
                state.salesShooppingCart.push(action.payload);
            }
        },
        removeSale: (state, action) => {
            state.salesShooppingCart = state.salesShooppingCart.filter(sale => sale.id !== action.payload.id);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSalesFetch.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getSalesFetch.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.sales = action.payload.ventas;
            })
            .addCase(getSalesFetch.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(getSaleFetch.pending, (state) => {
                state.saleStatus = "loading";
            })
            .addCase(getSaleFetch.fulfilled, (state, action) => {
                state.saleStatus = "succeeded";
                state.client = action.payload;
            })
            .addCase(getSaleFetch.rejected, (state, action) => {
                state.saleStatus = "failed";
                state.saleError = action.error.message;
            });
    }
});
export const { updateSales, clearSale, addSale, removeSale, updateSalesFilter } = saleSlice.actions;

export const selectSales = (state) => state.sale?.sales;
export const selectSale = (state) => state.sale?.sale;
export const selectSalesReport = (state) => state.sale?.salesReport;
export const selectSalesShooppingCart = (state) => state.sale?.salesShooppingCart;

export default saleSlice.reducer;
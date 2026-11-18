import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { LoadStatus, Product } from "../../types";

const API_URL = "https://fakestoreapi.com/products";

interface ProductsState {
  items: Product[];
  status: LoadStatus;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      return rejectWithValue(`Lỗi máy chủ (HTTP ${response.status})`);
    }
    const data = (await response.json()) as Product[];
    return data;
  } catch {
    return rejectWithValue("Không thể kết nối tới máy chủ. Vui lòng thử lại.");
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Đã có lỗi xảy ra";
      });
  },
});

export default productsSlice.reducer;

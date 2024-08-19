import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getArticles, getArticle } from "../../services/article/articleService";

export const getArticlesFetch = createAsyncThunk(
    "/get-all-articles", async () => {
        const response = await getArticles();
        return response;
    }
)

export const getArticleFetch = createAsyncThunk(
    "/get-one-article", async (alrticleId) => {
        const response = await getArticle(alrticleId);
        return response;
    }
)

export const articleSlice = createSlice({
    name: 'articles',
    initialState: {
        articles: [],
        article: {
        },
        status: 'idle',
        error: null,
        articleStatus: 'idle',
        articleError: null,
    },
    reducers: {
        updateArticles: (state, action) => {
            state.articles = action.payload;
        },
        clearArticle: (state) => {
            state.client = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getArticlesFetch.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getArticlesFetch.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.articles = action.payload.productos;
            })
            .addCase(getArticlesFetch.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(getArticleFetch.pending, (state) => {
                state.articleStatus = "loading";
            })
            .addCase(getArticleFetch.fulfilled, (state, action) => {
                state.clientStatus = "succeeded";
                state.article = action.payload;
            })
            .addCase(getArticleFetch.rejected, (state, action) => {
                state.articleStatus = "failed";
                state.articleError = action.error.message;
            });
    }
});
export const { updateArticles, clearArticle } = articleSlice.actions;

export const selectArticles = (state) => state.article?.articles;
export const selectArticle = (state) => state.article?.article;

export default articleSlice.reducer;
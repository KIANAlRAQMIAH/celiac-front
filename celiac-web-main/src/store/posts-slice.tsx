import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type Post = {
  _id: number;
  title: string;
  content: string;
  // Add more properties as needed
};
const initialState = { isLoading: true, posts: [] as Post[] };
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    endLoading(state) {
      state.isLoading = false;
    },
    fetchAll(state, action) {
      // (state.posts = action.payload.data),
      // (state.currentPage = action.payload.currentPage),
      // (state.numberOfPages = action.payload.numberOfPages);
    },
    fetchSinglePost(state, action) {
      // state.post = action.payload;
    },
    fetchPostsWithSearch(state, action) {
      state.posts = action.payload;
    },
    createPost(state, action) {
      state.posts = [...state.posts, action.payload];
    },
    updatePost(state, action) {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    updateLikes(state, action) {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    deletePost(state, action) {
      state.posts = state.posts.filter((post) => post._id != action.payload);
    },
    addComment(state, action) {
      // state.comments = state.posts.map((post) => {
      //   if (post._id === action.payload._id) {
      //     return action.payload;
      //   }
      //   return post;
      // });
    },
  },
});

export const postsActons = postsSlice.actions;
export default postsSlice.reducer;

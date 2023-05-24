import { apiSlice } from "./apiSlice";

export const blogSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleBlog: builder.query({
      query: (id) => ({
        url: `/api/blog/singleBlog/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    addComment: builder.mutation({
      query: ({ data, blogId }) => ({
        url: `/api/blog/comment/${blogId}`,
        method: "POST",
        body: data,
      }),
    }),
    editComment: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/blog/comment/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/api/blog/comment/${id}`,
        method: "DELETE",
      }),
    }),
    likeBlog: builder.mutation({
      query: (id) => ({
        url: `/api/blog/singleBlog/like/${id}`,
        method: "PATCH",
      }),
    }),
    allBlogs: builder.query({
      query: () => ({
        url: "/api/blog",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Blogs"],
    }),
    blogsByCategory: builder.query({
      query: (id) => ({
        url: `/api/blog/category/${id}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Blogs"],
    }),
    allCategories: builder.query({
      query: () => ({
        url: "/api/admin/category",
      }),
    }),
    searchBlogs: builder.query({
      query: ({ search, category }) => ({
        url: "/api/blog/search",
        params: { search, category },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Blogs"],
    }),
  }),
});

export const {
  useGetSingleBlogQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
  useLikeBlogMutation,
  useAllBlogsQuery,
  useBlogsByCategoryQuery,
  useAllCategoriesQuery,
  useSearchBlogsQuery,
} = blogSlice;

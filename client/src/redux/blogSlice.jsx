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
  }),
});

export const {
  useGetSingleBlogQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
} = blogSlice;

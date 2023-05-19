import { apiSlice } from "./apiSlice";

export const blogSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleBlog: builder.query({
      query: (id) => ({
        url: `/api/blog/singleBlog/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetSingleBlogQuery } = blogSlice;

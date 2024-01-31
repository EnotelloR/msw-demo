import {baseApi} from "../baseApi";
import {Post} from "../../models";

const postsApiSlice = baseApi.enhanceEndpoints({addTagTypes: ['Posts']}).injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<Post[], void>({
      query: () => ({
        url: 'posts',
      }),
      providesTags: ['Posts']
    }),
    addPost: build.mutation<void, Post>({
      query: (post) => ({
        url: 'posts',
        method: 'POST',
        body: post
      }),
      invalidatesTags: ['Posts']
    })
  })
})

export const {useGetPostsQuery, useAddPostMutation} = postsApiSlice;

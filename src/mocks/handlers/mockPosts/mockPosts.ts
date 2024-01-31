import {mockPostsData} from "./mockPostsData";
import {delay, http, HttpResponse} from "msw";
import {Post} from "../../../models";

const mockGetPosts = http.get('https://jsonplaceholder.typicode.com/posts', async () => {
  await delay(600);
  return HttpResponse.json(mockPostsData, {status: 200})
});

const mockAddPost = http.post('https://jsonplaceholder.typicode.com/posts', async ({request}) => {
  const newPost = await request.json()
  mockPostsData.push(<Post>newPost)
  
  return HttpResponse.json(newPost, {status: 201})
});

export const mockPosts = [mockGetPosts, mockAddPost]
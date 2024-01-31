import {Button, Card, Divider, Input, Stack, Typography} from "@mui/material";
import {useAddPostMutation, useGetPostsQuery} from "../../api/posts/posts";
import {Post} from "../../models";
import {ChangeEvent, useState} from "react";

export const Posts = () => {
  const {data: posts} = useGetPostsQuery();
  const [addPost] = useAddPostMutation();

  const lastTenPosts = posts ? posts.slice(posts.length - 10) : []

  const [postTitle, setPostTitle] = useState('');

  const addPostClickHandler = () => {
    if (posts) {
      const post: Post = {userId: Math.random(), title: postTitle, id: posts.length + 2, body: ''}
      addPost(post)
    }
  }

  const onPostTitleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setPostTitle(event.target.value)


  if (posts)
    return (
      <Stack gap={2}>
        <Typography variant={'h2'}>Посты: </Typography>
        <Stack gap={2}>
          {lastTenPosts.map((post) => <Card key={post.id}
                                            variant={'outlined'}><Typography>{post.title}</Typography></Card>)}
        </Stack>
        <Divider/>
        <Stack direction={"row"} justifyContent={'space-between'}>
          <Input placeholder={'Введите текст поста'}
                 onChange={onPostTitleChange} value={postTitle}/>
          <Button
            variant={'contained'} onClick={addPostClickHandler}>
            Добавить пост
          </Button>
        </Stack>
      </Stack>
    );

  return null
};
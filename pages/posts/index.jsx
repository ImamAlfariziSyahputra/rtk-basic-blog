import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPosts,
  selectPosts,
  getPostStatus,
  getPostError,
} from '../../redux/slice/post/postSlice';
import AddPostForm from '../../components/post/AddPostForm';
import PostList from '../../components/post/PostList';

export default function Posts({ users }) {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const postStatus = useSelector(getPostStatus);
  const postError = useSelector(getPostError);
  // console.log('posts => ', posts);

  //! "slice()" to create a new Array
  const orderNewestPost = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus]);

  return (
    <>
      <AddPostForm users={users} />
      {postStatus === 'loading' && (
        <div className="text-center mt-3">Loading...</div>
      )}
      {postStatus === 'success' && posts && (
        <PostList posts={orderNewestPost.slice(0, 14)} users={users} />
      )}
      {postStatus === 'failed' && postError && (
        <div className="text-center text-red-600 mt-3">{postError}</div>
      )}
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();

  return {
    props: {
      users,
    },
  };
}

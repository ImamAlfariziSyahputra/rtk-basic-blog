import { useSelector } from 'react-redux';
import { selectPosts } from '../../redux/slice/post/postSlice';
import AddPostForm from '../../components/post/AddPostForm';
import PostList from '../../components/post/PostList';

export default function Posts() {
  const posts = useSelector(selectPosts);

  //! "slice()" to create a new Array
  const orderNewestPost = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <AddPostForm />
      <PostList posts={orderNewestPost} />
    </>
  );
}

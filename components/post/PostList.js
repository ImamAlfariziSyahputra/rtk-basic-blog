import { parseISO, formatDistanceToNow } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../redux/slice/user/userSlice';
import ReactionButtons from './ReactionButtons';

export default function PostList({ posts, users }) {
  const getUserNameById = (userId) => {
    const user = users.find((user) => user.id == userId);

    return user?.name ? user.name : 'Unkown';
  };

  const converDateToTimeAgo = (date) => {
    const parseDate = parseISO(date);
    const timeAgo = formatDistanceToNow(parseDate);

    return `${timeAgo} ago`;
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-4xl text-center mb-5">Posts</h2>

      <div className="flex flex-col space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="border border-white rounded p-4">
            <h3 className="text-3xl">{post.title}</h3>
            <p className="mb-2">{post.body.substring(0, 100)}</p>
            <p className="text-sm opacity-80">
              by {getUserNameById(post.userId)}
              <span className="ml-2 italic">
                {converDateToTimeAgo(post.date)}
              </span>
            </p>
            <div className="flex justify-end">
              <ReactionButtons post={post} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

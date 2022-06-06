import React from 'react';
import { useDispatch } from 'react-redux';
import { addReaction } from '../../redux/slice/post/postSlice';

const reactionEmojis = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕',
};

export default function ReactionButtons({ post }) {
  const dispatch = useDispatch();

  return (
    <div>
      {Object.entries(reactionEmojis).map(([name, emoji]) => (
        <button
          key={name}
          type="button"
          className="mr-2"
          onClick={() =>
            dispatch(addReaction({ postId: post.id, reaction: name }))
          }
        >
          {emoji}
          {post.reactions[name]}
        </button>
      ))}
    </div>
  );
}

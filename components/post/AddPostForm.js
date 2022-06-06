import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addPost } from '../../redux/slice/post/postSlice';
import { selectUsers } from '../../redux/slice/user/userSlice';

export default function AddPost() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const users = useSelector(selectUsers);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && content) {
      dispatch(addPost(title, content, userId));

      setTitle('');
      setContent('');
      setUserId('');
    }
  };

  const isValid = Boolean(title) && Boolean(content) && Boolean(userId);

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <div className="max-w-md mx-auto mt-10 p-3 border rounded">
      <h2 className="text-4xl text-center mb-5">Add New Post</h2>

      <form className="block space-y-3">
        <div className="flex flex-col">
          <label htmlFor="userId">Author :</label>
          <select
            name="userId"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          >
            <option value="">Select user...</option>
            {usersOptions}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="title">Title :</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-8"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="content">Content :</label>
          <textarea
            type="text"
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            className={`p-2 border hover:opacity-70 ${
              !isValid && 'disabled:cursor-not-allowed opacity-70'
            }`}
            onClick={handleSubmit}
            disabled={!isValid}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
